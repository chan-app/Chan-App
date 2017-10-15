import { connect } from "react-redux";
import { updateSearchInput } from "../actions/Input";
import { refreshPosts } from "../actions/Posts";
import { refreshThreads } from "../actions/Threads";
import Header from "../components/Header";

const mapState = ({ Styles }) => ({
  header: Styles.get("header").toObject()
});

const mapActions = dispatch => ({
  updateSearchInput: text => dispatch(updateSearchInput(text)),
  refreshPosts: (board, thread) => dispatch(refreshPosts(board, thread)),
  refreshThreads: board => dispatch(refreshThreads(board))
});

export default connect(mapState, mapActions)(Header);
