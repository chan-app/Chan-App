import { RECEIVED_BOARD_LIST, CLEAR_BOARD_LIST } from "../constants/Threads";
import { getThreadsURL } from "../constants/Chan";

const requestThreads = (board, page) => async dispatch => {
  const res = await fetch(getThreadsURL(board, page));
  const payload = await res.json();
  dispatch({ type: RECEIVED_BOARD_LIST, payload });
};

const clearThreads = () => ({
  type: CLEAR_BOARD_LIST
});

const refreshThreads = board => dispatch => {
  dispatch(clearThreads());
  requestThreads(board, 1)(dispatch);
};

export { requestThreads, clearThreads, refreshThreads };
