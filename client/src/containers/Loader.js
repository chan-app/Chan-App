import { connect } from "react-redux";
import Loader from "../components/Loader";

const mapState = ({ Styles }) => ({
  textStyle: Styles.get("text").toObject()
});

const mapActions = () => ({});

export default connect(mapState, mapActions)(Loader);
