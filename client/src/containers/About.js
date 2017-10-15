import { connect } from "react-redux";

import { updateImages, updateNSFW, updateBadWords } from "../actions/Settings";

const mapState = ({ Styles, Settings }) => ({
  textStyle: Styles.get("text").toObject(),
  imageStatus: Settings.get("showImages"),
  NSFWStatus: Settings.get("showNSFW"),
  badWordStatus: Settings.get("showBadWords")
});

const mapActions = dispatch => ({
  handleImages: () => dispatch(updateImages()),
  handleNSFW: () => dispatch(updateNSFW()),
  handleBadWords: () => dispatch(updateBadWords())
});

export default connect(mapState, mapActions);
