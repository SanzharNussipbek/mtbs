import { combineReducers } from "redux";
import sessionReducer from "./session/session.slice";
import userReducer from "./user/user.slice";
import loadingReducer from "./loading/loading.slice";
import movieReducer from "./movie/movie.slice";
import postReducer from "./post/post.slice";
import faqReducer from "./faq/faq.slice";
import seatReducer from "./seat/seat.slice";
import hallReducer from "./hall/hall.slice";
import ticketReducer from "./ticket/ticket.slice";

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
  loading: loadingReducer,
  movie: movieReducer,
  post: postReducer,
  faq: faqReducer,
  seat: seatReducer,
  hall: hallReducer,
  ticket: ticketReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
