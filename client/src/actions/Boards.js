import { getBoardsURL } from "../constants/Chan";
import { RECEIVE_BOARD_LIST, CLEAR_BOARD_LIST } from "../constants/Boards";

const requestBoards = () => async dispatch => {
  const res = await fetch(getBoardsURL());
  const payload = await res.json();
  dispatch({ type: RECEIVE_BOARD_LIST, payload });
};

export { requestBoards };
