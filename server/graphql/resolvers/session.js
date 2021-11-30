const Session = require("../../models/Session");
const { UserInputError } = require("apollo-server");
const { validateCreateSessionInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getSessions() {
      try {
        const sessions = await Session.find()?.sort({ createdAt: -1 });
        return sessions;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getSession(_, { id }) {
      try {
        const session = await Session.findById(id);
        if (!session) {
          throw new Error("Session not found");
        }
        return session;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createSession(
      _,
      { data: { movieId, hallId, date, startTime, endTime } },
      context
    ) {
      const { valid, errors } = await validateCreateSessionInput(
        movieId,
        hallId,
        date,
        startTime,
        endTime
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      const newSession = new Session({
        movieId,
        hallId,
        date,
        startTime,
        endTime,
        createdAt: new Date().toISOString(),
      });

      const session = await newSession.save();

      return session;
    },
    async deleteSession(_, { id }, context) {
      try {
        const session = await Session.findById(id);
        if (!session) {
          throw new Error("Session not found");
        }
        await session.delete();
        return "Session deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
    async updateSession(_, { data }, context) {
      try {
        const { id, ...updateSessionInput } = data;
        const session = await Session.findById(id);
        if (!session) {
          throw new Error("Session not found");
        }
        const updatedSession = await Session.findByIdAndUpdate(id, updateSessionInput, {
          new: true,
        });
        return updatedSession;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
