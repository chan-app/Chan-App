import {
  UPDATE_IMAGES,
  UPDATE_NSFW,
  UPDATE_BAD_WORDS
} from "../constants/Settings";

export const updateImages = () => ({
  type: UPDATE_IMAGES
});

export const updateNSFW = () => ({
  type: UPDATE_NSFW
});

export const updateBadWords = () => ({
  type: UPDATE_BAD_WORDS
});
