import { Map } from "immutable";

import {
  UPDATE_IMAGES,
  UPDATE_NSFW,
  UPDATE_BAD_WORDS
} from "../constants/Settings";

const initial = Map({
  showImages: false,
  showNSFW: false,
  showBadWords: false
});

const reducer = (state = initial, { type, payload }) => {
  switch (type) {
    case UPDATE_IMAGES: {
      return state.set("showImages", !state.get("showImages"));
    }
    case UPDATE_NSFW: {
      return state.set("showNSFW", !state.get("showNSFW"));
    }
    case UPDATE_BAD_WORDS: {
      return state.set("showBadWords", !state.get("showBadWords"));
    }
    default: {
      return state;
    }
  }
};

export default reducer;
