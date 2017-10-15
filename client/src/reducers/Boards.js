import { List, Map } from "immutable";
import { RECEIVE_BOARD_LIST } from "../constants/Boards";

const initial = Map({
  boards: List()
});

const getBoardsFromPayload = ({ boards }) =>
  List(
    boards.map(({ board, title, ws_board, meta_description }) =>
      Map({ board, title, ws_board, meta_description })
    )
  );

const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    case RECEIVE_BOARD_LIST: {
      return state.set("boards", getBoardsFromPayload(payload));
    }
    default: {
      return state;
    }
  }
};

export default reducer;
