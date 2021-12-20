const usersResolvers = require("./users");
const moviesResolvers = require("./movies");
const hallResolvers = require("./hall");
const seatResolvers = require("./seat");
const ticketResolvers = require("./ticket");
const sessionResolvers = require("./session");
const sessionSeatResolvers = require("./sessionSeat");
const postResolvers = require("./post");

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...moviesResolvers.Query,
    ...hallResolvers.Query,
    ...seatResolvers.Query,
    ...ticketResolvers.Query,
    ...sessionResolvers.Query,
    ...sessionSeatResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...moviesResolvers.Mutation,
    ...hallResolvers.Mutation,
    ...seatResolvers.Mutation,
    ...ticketResolvers.Mutation,
    ...sessionResolvers.Mutation,
    ...sessionSeatResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};
