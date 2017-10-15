import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { offline } from "redux-offline";
import defaultConfig from "redux-offline/lib/defaults";
import Thunk from "redux-thunk";
import immutableTransform from "redux-persist-transform-immutable";

import Styles from "./reducers/Styles";
import Input from "./reducers/Input";
import Boards from "./reducers/Boards";
import Threads from "./reducers/Threads";
import Posts from "./reducers/Posts";
import Settings from "./reducers/Settings";

const offlineConfig = {
  ...defaultConfig,
  persistOptions: {
    transforms: [immutableTransform()]
  }
};

const reducers = combineReducers({
  Styles,
  Boards,
  Input,
  Threads,
  Posts,
  Settings
});
const middlewares = compose(applyMiddleware(Thunk), offline(offlineConfig));
const store = createStore(reducers, middlewares);

export default store;
