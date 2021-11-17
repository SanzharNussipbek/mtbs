const usersResolvers = require("./users");
const moviesResolvers = require("./movies");

module.exports = {
  Query: {
    ...moviesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...moviesResolvers.Mutation,
  },
};
