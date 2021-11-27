const usersResolvers = require("./users");
const moviesResolvers = require("./movies");
const hallResolvers = require("./hall");
const seatResolvers = require("./seat");
const ticketResolvers = require("./ticket");
const sessionResolvers = require("./session");
const sessionSeatResolvers = require("./sessionSeat");

module.exports = {
  Query: {
    ...moviesResolvers.Query,
    ...hallResolvers.Query,
    ...seatResolvers.Query,
    ...ticketResolvers.Query,
    ...sessionResolvers.Query,
    ...sessionSeatResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...moviesResolvers.Mutation,
    ...hallResolvers.Mutation,
    ...seatResolvers.Mutation,
    ...ticketResolvers.Mutation,
    ...sessionResolvers.Mutation,
    ...sessionSeatResolvers.Mutation,
  },
};
