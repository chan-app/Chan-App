import { connect } from "react-redux";
import { requestBoards } from "../actions/Boards";

const filter = (find, status) => item => {
  const board = item.get("board").toLowerCase();
  const title = item.get("title").toLowerCase();
  const input = find.toLowerCase();
  return (
    (board.indexOf(input) > -1 || title.indexOf(input) > -1) &&
    (status || item.get("ws_board") === 1)
  );
};

const mapState = ({ Boards, Styles, Input, Settings }) => {
  const boards = Boards.get("boards");
  const searchInput = Input.get("searchInput");
  const NSFWStatus = Settings.get("showNSFW");
  return {
    boards: boards.filter(filter(searchInput, NSFWStatus)),
    textStyles: Styles.get("text").toObject(),
    searchInput: searchInput
  };
};

const mapActions = dispatch => ({
  requestBoards: () => dispatch(requestBoards())
});

export default connect(mapState, mapActions);
