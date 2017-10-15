import { connect } from "react-redux";
import { requestPosts, clearPosts } from "../actions/Posts";

const mapState = ({ Styles, Posts }) => ({
  header: Styles.get("header").toObject(),
  posts: Posts.get("posts")
});

const mapActions = dispatch => ({
  requestPosts: (board, number) => dispatch(requestPosts(board, number)),
  clearPosts: () => dispatch(clearPosts())
});

export default connect(mapState, mapActions);
