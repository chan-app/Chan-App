import { getPostsURL } from "../constants/Chan";
import { RECEIVED_POST_LIST, CLEAR_POST_LIST } from "../constants/Posts";

const requestPosts = (board, thread) => async dispatch => {
  const res = await fetch(getPostsURL(board, thread));
  const payload = await res.json();
  dispatch({ type: RECEIVED_POST_LIST, payload });
};

const clearPosts = () => ({
  type: CLEAR_POST_LIST
});

const refreshPosts = (board, thread) => dispatch => {
  dispatch(clearPosts());
  requestPosts(board, thread)(dispatch);
};

export { requestPosts, clearPosts, refreshPosts };
