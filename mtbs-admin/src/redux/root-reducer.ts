import { combineReducers } from 'redux';
import sessionReducer from './session/session.slice';
import userReducer from './user/user.slice';

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
