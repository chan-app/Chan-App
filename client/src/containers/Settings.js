import { connect } from "react-redux";

const mapState = ({ Settings }) => ({
  imageStatus: Settings.get("showImages"),
  NSFWStatus: Settings.get("showNSFW"),
  badWordStatus: Settings.get("showBadWords")
});

const mapDispatch = () => ({});

export default connect(mapState, mapDispatch);
