export interface User {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  phone: string;
  tickets: [string];
  status: string;
  createdAt: string;
};

export interface Movie {
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
};

export interface Post {
  title: string;
  body: string;
  author: string;
  imgUrl: string;
  createdAt: string;
}