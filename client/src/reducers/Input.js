import { Map } from "immutable";
import { UPDATE_USER_INPUT } from "../constants/Input";

const initial = Map({
  searchInput: ""
});

const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_INPUT: {
      return state.set("searchInput", payload);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
