import { combineReducers } from "redux";
import sessionReducer from "./session/session.slice";
import userReducer from "./user/user.slice";
import loadingReducer from "./loading/loading.slice";
import movieReducer from "./movie/movie.slice";

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
  loading: loadingReducer,
  movie: movieReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;