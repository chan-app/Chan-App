import { connect } from "react-redux";

const mapState = ({ Styles }) => ({
  textStyle: Styles.get("text").toObject(),
  bodyStyle: Styles.get("body").toObject(),
  headerStyle: Styles.get("header").toObject(),
  titleStyke: Styles.get("title").toObject()
});

const mapActions = () => ({});

export default connect(mapState, mapActions);
