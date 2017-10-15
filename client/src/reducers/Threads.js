import { Map, List } from "immutable";
import { RECEIVED_BOARD_LIST, CLEAR_BOARD_LIST } from "../constants/Threads";

const initial = Map({
  threads: List([])
});

const transformThreads = ({ threads }) =>
  List(
    threads.map(({ posts }) => {
      const postList = List(posts.map(item => Map(item)));
      const originalPost = postList.get(0);
      const children = postList.rest();
      return Map({
        ...originalPost.toObject(),
        children
      });
    })
  );

const threadsMergeWithoutDupes = (IDs, oldList, newList) =>
  newList.reduce(
    (total, current) =>
      IDs.includes(current.get("no")) ? total : total.push(current),
    oldList
  );

const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    case CLEAR_BOARD_LIST: {
      return state.set("threads", List([]));
    }
    case RECEIVED_BOARD_LIST: {
      const last = state.get("threads");
      const IDs = last.map(item => item.get("no"));
      const next = transformThreads(payload);
      const unique = threadsMergeWithoutDupes(IDs, last, next);
      return state.set("threads", unique);
    }
    default: {
      return state;
    }
  }
};

export default reducer;
