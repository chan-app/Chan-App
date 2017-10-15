import { UPDATE_USER_INPUT } from "../constants/Input";

const updateSearchInput = text => ({
  type: UPDATE_USER_INPUT,
  payload: text
});

export { updateSearchInput };
