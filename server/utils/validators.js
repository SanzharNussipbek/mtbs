const Hall = require("../models/Hall");
const Movie = require("../models/Movie");

module.exports.validateRegisterInput = (
  firstname,
  lastname,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (firstname.trim() === "") {
    errors.firstname = "First name must not be empty";
  }
  if (lastname.trim() === "") {
    errors.lastname = "Last name must not be empty";
  }
  if (email.trim() === "") {
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
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateMovieInput = (
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
  imgUrl
) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Name must not be empty";
  }
  if (description.trim() === "") {
    errors.description = "Description must not be empty";
  }
  if (duration.trim() === "") {
    errors.duration = "Duration must not be empty";
  }
  if (language.trim() === "") {
    errors.language = "Language must not be empty";
  }
  if (releaseDate.trim() === "") {
    errors.releaseDate = "ReleaseDate must not be empty";
  }
  if (country.trim() === "") {
    errors.country = "Country must not be empty";
  }
  if (genre.trim() === "") {
    errors.genre = "Genre must not be empty";
  }
  if (director.trim() === "") {
    errors.director = "Director must not be empty";
  }
  if (cast.trim() === "") {
    errors.cast = "Cast must not be empty";
  }
  if (rating.trim() === "") {
    errors.rating = "Rating must not be empty";
  }
  if (imgUrl.trim() === "") {
    errors.imgUrl = "Image URL must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateHallInput = (name, type, totalSeats) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Hall name must not be empty";
  }
  if (type.trim() === "") {
    errors.type = "Hall type must not be empty";
  }
  if (totalSeats == null) {
    errors.totalSeats = "Total number of seats must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateSeatInput = (seatNumber, hallId) => {
  const errors = {};
  if (hallId.trim() === "") {
    errors.hallId = "Hall ID must not be empty";
  } else {
    const hall = await Hall.findById(hallId);
    if (!hall) {
      errors.hallId = "Hall with such ID is not found";
    }
  }

  if (seatNumber == null) {
    errors.duration = "Seat number must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateSessionInput = (
  movieId,
  hallId,
  date,
  startTime,
  endTime
) => {
  const errors = {};
  if (movieId.trim() === "") {
    errors.movieId = "Movie ID must not be empty";
  } else {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      errors.movieId = "Movie with such ID is not found";
    }
  }
  if (hallId.trim() === "") {
    errors.hallId = "Hall ID must not be empty";
  } else {
    const hall = await Hall.findById(hallId);
    if (!hall) {
      errors.hallId = "Hall with such ID is not found";
    }
  }

  if (date.trim() === "") {
    errors.date = "Date must not be empty";
  }

  if (startTime.trim() === "") {
    errors.startTime = "Start time must not be empty";
  }

  if (endTime.trim() === "") {
    errors.endTime = "End time must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
