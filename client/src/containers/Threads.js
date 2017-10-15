import { connect } from "react-redux";
import { requestThreads, clearThreads } from "../actions/Threads";

const mapState = ({ Styles, Threads }) => ({
  header: Styles.get("header").toObject(),
  threads: Threads.get("threads")
});

const mapActions = dispatch => ({
  requestThreads: (board, page) => dispatch(requestThreads(board, page)),
  clearThreads: () => dispatch(clearThreads())
});

export default connect(mapState, mapActions);
