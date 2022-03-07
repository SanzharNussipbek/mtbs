export type HallType = "Standard" | "VIP" | "IMAX" | "Green";
export type SeatType = "ADULT" | "STUDENT" | "CHILD";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
  tickets: [string];
  status: string;
  createdAt: string;
}

export interface Movie {
  id: string;
  name: string;
  description: string;
  duration: string;
  language: string;
  releaseDate: string;
  country: string;
  genre: string;
  director: string;
  cast: string;
  rating: string;
  imgUrl: string;
  trailerUrl: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  imgUrl: string;
  sourceUrl: string;
  createdAt: string;
}

export interface Seat {
  id: string;
  hallId: string;
  seatNumber: number;
  rowNumber: number;
}

export interface Hall {
  id: string;
  name: string;
  type: HallType;
  seats: Seat[];
}

export interface SessionSeat {
  id: string;
  seat: Seat;
  type: SeatType | '';
  status: string;
}

export interface SessionRates {
  ADULT: number;
  CHILD: number;
  STUDENT: number;
}

export interface Session {
  id: string;
  datetime: number;
  movie: Movie;
  hall: Hall;
  seats: SessionSeat[];
  rates: SessionRates;
}

export interface Ticket {
  id: string;
  session: Session;
  seats: SessionSeat[];
  userId: string;
  price: string;
  status: string;
  createdAt: string;
  promocode?: string;
}
