const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const checkAuth = require("../../utils/auth");

const { SECRET_KEY } = require("../../config");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");

const User = require("../../models/User");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    async register(
      _,
      {
        registerInput: {
          firstname,
          lastname,
          password,
          confirmPassword,
          email,
        },
      }
    ) {
      const { valid, errors } = validateRegisterInput(
        firstname,
        lastname,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors.", {
          errors,
        });
      }

      const user = await User.findOne({ email });
      if (user) {
        throw new UserInputError("This email is already used", {
          errors: {
            email: "This email is already used",
          },
        });
      }

      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        firstname,
        lastname,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res.id,
        token: token,
      };
    },
    async login(_, { email, password }) {
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors.", {
          errors,
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", {
          errors,
        });
        return;
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", {
          errors,
        });
        return;
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user.id,
        token: token,
      };
    },
    async updateUser(_, { updateUserInput }, context) {
      const user = await User.findOne({ email: updateUserInput.email });
      const signedUser = checkAuth(context);

      if (user?.id !== signedUser?.id) {
        throw new UserInputError("User is not signed in");
      }

      if (!user) {
        throw new UserInputError("User not found");
      }

      const updatedUser = await User.findOneAndUpdate(
        { id: signedUser.id },
        {
          firstname: updateUserInput.firstname,
          lastname: updateUserInput.lastname,
          email: updateUserInput.email,
          password: await bcrypt.hash(updateUserInput.password, 12),
          phone: updateUserInput.phone,
        },
        { new: true }
      );

      const token = generateToken(updatedUser);
      return {
        ...updatedUser._doc,
        id: updatedUser.id,
        token: token,
      };
    },
  },
};
