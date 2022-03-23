const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const checkAuth = require("../../utils/auth");
const { Ticket } = require("../../models/Ticket");
const { Session } = require("../../models/Session");
const { SessionSeat } = require("../../models/SessionSeat");
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
  Query: {
    async getAllUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getUser(_, { id }) {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async register(
      _,
      {
        registerInput: {
          firstname,
          lastname,
          phone,
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
        phone,
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
    async updateUser(_, { data }, context) {
      const { id, ...updateUserInput } = data;
      const user = await User.findById(id);

      if (!user) {
        throw new UserInputError("User not found");
      }

      const updatedUser = await User.findOneAndUpdate(
        { id: id },
        {
          firstname: updateUserInput?.firstname?.length
            ? updateUserInput?.firstname
            : user?.firstname,
          lastname: updateUserInput?.lastname?.length
            ? updateUserInput?.lastname
            : user?.lastname,
          email: updateUserInput?.email?.length
            ? updateUserInput?.email
            : user?.email,
          phone: updateUserInput?.phone?.length
            ? updateUserInput?.phone
            : user?.phone,
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
    async changePassword(
      _,
      { data: { id, oldPassword, newPassword } },
      context
    ) {
      const user = await User.findById(id);

      if (!user) {
        throw new UserInputError("User not found");
      }

      const match = await bcrypt.compare(oldPassword, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", {
          errors,
        });
        return;
      }
      const password = await bcrypt.hash(newPassword, 12);
      const updatedUser = await User.findOneAndUpdate(
        { id: id },
        {
          password: password,
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
    async deleteUser(_, { id }, context) {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not found");
        }

        const ticketIds = user?.tickets;
        for (let i = 0; i < ticketIds.length; i++) {
          const ticket = await Ticket.findById(ticketIds[i]);
          const session = await Session.findById(ticket.session?.id);
          const sessionSeats = session?.seats;
          sessionSeats?.map(async (seat) => {
            await SessionSeat.findByIdAndUpdate(seat?.id, { status: "VACANT" });
            return { ...seat, status: "VACANT" };
          });
          await Session.findByIdAndUpdate(session?.id, { seats: sessionSeats });

          await ticket.delete();
        }

        await user.delete();
        return "User deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
