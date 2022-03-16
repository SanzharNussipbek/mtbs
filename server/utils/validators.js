const { Hall } = require("../models/Hall");
const { Movie } = require("../models/Movie");
const { Ticket } = require("../models/Ticket");
const User = require("../models/User");
const { Session } = require("../models/Session");
const { Seat } = require("../models/Seat");
const { SessionSeat } = require("../models/SessionSeat");

module.exports.validateRegisterInput = (
  firstname,
  lastname,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (firstname?.trim() === "") {
    errors.firstname = "First name must not be empty";
  }
  if (lastname?.trim() === "") {
    errors.lastname = "Last name must not be empty";
  }
  if (email?.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email?.trim() === "") {
    errors.email = "Email must not be empty";
  }
  if (password?.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateMovieInput = async (
  name,
  description,
  duration,
  language,
  releaseDate,
  country,
  genre,
  director,
  cast,
  rating,
  imgUrl,
  trailerUrl
) => {
  const errors = {};
  if (name?.trim() === "") {
    errors.name = "Name must not be empty";
  } else {
    const movie = await Movie.findOne({ name }).exec();
    if (movie !== null) {
      errors.name = "Movie with this name already exists";
    }
  }
  if (description?.trim() === "") {
    errors.description = "Description must not be empty";
  }
  if (duration == null) {
    errors.duration = "Duration must not be empty";
  }
  if (language?.trim() === "") {
    errors.language = "Language must not be empty";
  }
  if (releaseDate?.trim() === "") {
    errors.releaseDate = "ReleaseDate must not be empty";
  }
  if (country?.trim() === "") {
    errors.country = "Country must not be empty";
  }
  if (genre?.trim() === "") {
    errors.genre = "Genre must not be empty";
  }
  if (director?.trim() === "") {
    errors.director = "Director must not be empty";
  }
  if (cast?.trim() === "") {
    errors.cast = "Cast must not be empty";
  }
  if (rating?.trim() === "") {
    errors.rating = "Rating must not be empty";
  }
  if (imgUrl?.trim() === "") {
    errors.imgUrl = "Image URL must not be empty";
  }
  if (trailerUrl?.trim() === "") {
    errors.trailerUrl = "Trailer URL must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateHallInput = async (name, type, seatIds) => {
  const errors = {};
  if (name?.trim() === "") {
    errors.name = "Hall name must not be empty";
  } else {
    const hall = await Hall.findOne({ name: name?.trim() }).exec();
    if (hall !== null) {
      errors.name = "Hall name is already used";
    }
  }

  if (type?.trim() === "") {
    errors.type = "Hall type must not be empty";
  } else if (
    type?.trim() !== "" &&
    type?.trim() !== "Standard" &&
    type?.trim() !== "VIP" &&
    type?.trim() !== "Green" &&
    type?.trim() !== "IMAX"
  ) {
    errors.type = "Hall type is invalid";
  }

  for (let i = 0; i < seatIds.length; i++) {
    const seat = await Seat.findById(seatIds[i]);
    if (!seat) {
      errors.seatIds = "Seat IDs are invalid";
      break;
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateSeatInput = async (
  seatNumber,
  rowNumber,
  hallId
) => {
  const errors = {};

  if (hallId?.trim() === "") {
    errors.hallId = "Hall ID must not be empty";
  } else {
    const hall = await Hall.findById(hallId);
    if (!hall) {
      errors.hallId = "Hall not found";
    }
  }

  if (seatNumber == null) {
    errors.seatNumber = "Seat number must not be empty";
  } else if (rowNumber == null) {
    errors.rowNumber = "Row number must not be empty";
  } else {
    const seat = await Seat.findOne({ seatNumber, rowNumber, hallId }).exec();
    if (seat) {
      errors.seatNumber = "Seat is already used";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateSessionInput = async (
  movieId,
  hallId,
  datetime,
  adultRate, 
  studentRate, 
  childRate
) => {
  const errors = {};

  if (movieId == null) {
    errors.movieId = "Movie ID must not be empty";
  } else {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      errors.movieId = "Movie not found";
    }
  }

  if (hallId == null) {
    errors.hallId = "Hall ID must not be empty";
  } else {
    const hall = await Hall.findById(hallId);
    if (!hall) {
      errors.hallId = "Hall not found";
    }
  }

  const session = await Session.findOne({ datetime });

  if (datetime == null) {
    errors.datetime = "Datetime must not be empty";
  } else if (
    session !== null &&
    session?.hall?.id === hallId &&
    session?.movie?.id === movieId
  ) {
    errors.datetime = "This session already exists";
  }
  
  if (adultRate == null) {
    errors.rates = "Adult rate must not be empty";
  }

  if (studentRate == null) {
    errors.rates = "Student rate must not be empty";
  }

  if (childRate == null) {
    errors.rates = "Child rate must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateSessionSeatInput = async (seatId) => {
  const errors = {};

  if (seatId == null) {
    errors.seatId = "Seat ID must not be empty";
  } else {
    const seat = await Seat.findById(seatId);
    if (!seat) {
      errors.seatId = "Seat not found";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateTicketInput = async (
  sessionId,
  seatIds,
  userId,
  price
) => {
  const errors = {};

  if (userId?.trim() === "") {
    errors.userId = "User ID must not be empty";
  } else {
    const user = await User.findById(userId);
    if (!user) {
      errors.userId = "User not found";
    }
  }

  const session = await Session.findById(sessionId);

  if (sessionId == null) {
    errors.sessionId = "Session must not be empty";
  } else if (!session) {
    errors.sessionId = "Session not found";
  }

  if (!seatIds || seatIds?.length == 0) {
    errors.movie = "Seats must not be empty";
  } else {
    for (let i = 0; i < seatIds.length; i++) {
      const sessionSeat = await SessionSeat.findById(seatIds[i]);
      if (!sessionSeat) {
        errors.seatIds = "Seat IDs are invalid";
        break;
      } else if (sessionSeat.status !== "VACANT") {
        errors.seatIds = `Oops.. seat ${sessionSeat.seat.seatNumber} is already booked`;
        break;
      }
    }
  }

  if (price === null) {
    errors.price = "Price must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreatePostInput = (
  title,
  body,
  author,
  imgUrl,
  sourceUrl
) => {
  const errors = {};

  if (title?.trim() === "") {
    errors.title = "Title must not be empty";
  }

  if (body?.trim() === "") {
    errors.body = "Body must not be empty";
  }

  if (author?.trim() === "") {
    errors.author = "Author must not be empty";
  }

  if (imgUrl?.trim() === "") {
    errors.imgUrl = "Image URL must not be empty";
  }

  if (sourceUrl?.trim() === "") {
    errors.sourceUrl = "Source URL must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateFaqInput = (
  title,
  body,
) => {
  const errors = {};

  if (title?.trim() === "") {
    errors.title = "Title must not be empty";
  }

  if (body?.trim() === "") {
    errors.body = "Body must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
