const { Faq } = require("../../models/Faq");
const { UserInputError } = require("apollo-server");
const { validateCreateFaqInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getFaqs() {
      try {
        const faqs = await Faq.find()?.sort({ createdAt: -1 });
        return faqs;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getFaq(_, { id }) {
      try {
        const faq = await Faq.findById(id);
        if (!faq) {
          throw new Error("FAQ not found");
        }
        return faq;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createFaq(
      _,
      { data: { title, body } },
      context
    ) {
      const { valid, errors } = validateCreateFaqInput(
        title,
        body,
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      const newFaq = new Faq({
        title,
        body,
        createdAt: new Date().toISOString(),
      });

      const faq = await newFaq.save();

      return {
        ...faq._doc,
        id: faq.id,
      };
    },
    async deleteFaq(_, { id }, context) {
      try {
        const faq = await Faq.findById(id);
        if (!faq) {
          throw new Error("FAQ not found");
        }
        await faq.delete();
        return "FAQ deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
    async updateFaq(_, { data }, context) {
      try {
        const { id, ...updateFaqInput } = data;
        const faq = await Faq.findById(id);
        if (!faq) {
          throw new Error("Faq not found");
        }
        const updatedFaq = await Faq.findByIdAndUpdate(id, updateFaqInput, {
          new: true,
        });
        return updatedFaq;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
