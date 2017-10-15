import { Map, List } from "immutable";
import { RECEIVED_POST_LIST, CLEAR_POST_LIST } from "../constants/Posts";

const initial = Map({
  posts: List([])
});

const transformPosts = ({ posts }) => List(posts.map(item => Map(item)));

const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    case CLEAR_POST_LIST: {
      return state.set("posts", List([]));
    }
    case RECEIVED_POST_LIST: {
      return state.set("posts", transformPosts(payload));
    }
    default: {
      return state;
    }
  }
};

export default reducer;
