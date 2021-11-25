const Session = require("../../models/Session");
const { UserInputError } = require("apollo-server");
const { validateCreateSessionInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getSession() {
      try {
        const sessions = await Session.find()?.sort({ createdAt: -1 });
        return sessions;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getSession(_, { sessionId }) {
      try {
        const session = await Session.findById(sessionId);
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
      { movieId, hallId, date, startTime, endTime },
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
    async deleteSession(_, { sessionId }, context) {
      try {
        const session = await Session.findById(sessionId);
        if (!session) {
          throw new Error("Session not found");
        }
        await session.delete();
        return "Session deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
