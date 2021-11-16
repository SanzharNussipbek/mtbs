const usersResolvers = require("./users");
const moviesResolvers = require("./users");

module.exports = {
  Query: {
    ...moviesResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...moviesResolvers.Mutation,
  },
};
