import React from "react";
import { WebBrowser, Video, FileSystem } from "expo";
import {
  Image,
  Dimensions,
  View,
  TouchableWithoutFeedback,
  Alert,
  Text,
  CameraRoll
} from "react-native";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { Button, Icon } from "react-native-material-ui";
import { withNavigation } from "react-navigation";

import ConnectSettings from "../containers/Settings";

const styles = {
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    padding: 15,
    paddingBottom: 0
  },
  text: {
    fontSize: 18
  }
};

const getSmallImage = (board, tim) => `https://i.4cdn.org/${board}/${tim}s.jpg`;

const getLargeImage = (board, tim, ext) =>
  `https://i.4cdn.org/${board}/${tim}${ext}`;

const saveItem = async (imageURI, imageFilename, extension) => {
  try {
    const location = `${FileSystem.documentDirectory}/${imageFilename}${extension}`;
    const { uri } = await FileSystem.downloadAsync(imageURI, location);
    await CameraRoll.saveToCameraRoll(uri);
    Alert.alert("Complete", "Image has been saved.", [{ text: "OK" }], {
      cancelable: true
    });
  } catch (err) {
    Alert.alert("Error", "Could not save image.", [{ text: "OK" }], {
      cancelable: true
    });
  }
};

class ChanImage extends React.unstable_AsyncComponent {
  state = { full: false };

  actionSheetOptions = {
    options: ["Open in Browser", "Save Image", "Cancel"],
    cancelButtonIndex: 2
  };

  get showOptions() {
    return (
      this.props.navigation.state.routeName === "Posts" &&
      (this.props.item.get("com") || "") === ""
    );
  }

  get largeURI() {
    return getLargeImage(
      this.props.navigation.state.params.board,
      this.props.item.get("tim"),
      this.props.item.get("ext")
    );
  }

  handleMorePress(event) {
    event.stopPropagation();
    this.props.handlePostOptions(this.props.item);
  }

  prefetch() {
    Image.prefetch(this.largeURI);
  }

  handlePress() {
    this.setState(() => ({ full: true }));
  }

  handleLongPress() {
    this.props.showActionSheetWithOptions(
      this.actionSheetOptions,
      ::this.handleActionSheet
    );
  }

  handleActionSheet(index) {
    switch (index) {
      case 0: {
        WebBrowser.openBrowserAsync(this.largeURI);
        return;
      }
      case 1: {
        saveItem(
          this.largeURI,
          this.props.item.get("filename"),
          this.props.item.get("ext")
        );
        return;
      }
      default: {
        return;
      }
    }
  }

  handleContainerPress(event) {
    event.stopPropagation();
  }

  onVideoError(extension) {
    const format = extension.replace(".", "");
    return () =>
      Alert.alert(
        "Error",
        `You're platform does not support the ${format} format.`,
        [{ text: "OK" }],
        { cancelable: true }
      );
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return nextState.full !== this.state.full;
  }

  render() {
    const { board } = this.props.navigation.state.params;
    const window = Dimensions.get("window");
    const height = window.height;
    const width = window.width;
    const tim = this.props.item.get("tim");
    const ext = this.props.item.get("ext");
    const tn_h = this.props.item.get("tn_h");
    const tn_w = this.props.item.get("tn_w");
    const h = this.props.item.get("h");
    const w = this.props.item.get("w");

    const smallURI = getSmallImage(board, tim);
    const smallRatio = width / tn_w;
    const smallStyle = {
      height: height / 5,
      width: tn_w * smallRatio
    };

    const largeURI = this.largeURI;
    const largeRatio = width / w;
    const largeStyle = {
      height: h * largeRatio,
      width: w * largeRatio
    };

    const photoTypes = {
      ".jpg": true,
      ".jpeg": true,
      ".png": true,
      ".gif": true
    };

    let CurrentElement = null;

    if (this.state.full && photoTypes[ext]) {
      CurrentElement = <Image source={{ uri: largeURI }} style={largeStyle} />;
    } else if (this.state.full) {
      CurrentElement = (
        <Video
          source={{ uri: largeURI }}
          onError={this.onVideoError(ext)}
          rate={1.0}
          volume={1.0}
          useNativeControls={true}
          muted={false}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          shouldPlay
          usePoster={true}
          posterSource={{ uri: smallURI }}
          style={largeStyle}
        />
      );
    } else {
      CurrentElement = (
        <View>
          <Image
            onLoad={::this.prefetch}
            source={{ uri: smallURI }}
            style={smallStyle}
          />
          <View
            style={{
              ...styles.buttonContainer,
              marginTop: smallStyle.height * -1,
              height: smallStyle.height
            }}
          >
            <Button
              onPress={::this.handlePress}
              raised
              primary
              text="load"
              icon="visibility"
            />
          </View>
        </View>
      );
    }

    return (
      <View>
        <TouchableWithoutFeedback
          onPress={::this.handleContainerPress}
          onLongPress={::this.handleLongPress}
        >
          {CurrentElement}
        </TouchableWithoutFeedback>
        <View style={styles.textContainer}>
          <View
            style={{
              marginBottom: 15,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <Text style={styles.text}>
              {this.props.item.get("filename")}
              {this.props.item.get("ext")}
            </Text>
            {this.showOptions && (
              <TouchableWithoutFeedback onPress={::this.handleMorePress}>
                <View>
                  <Icon name="more-vert" />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const ImageContainer = props =>
  props.imageStatus ? <ChanImage {...props} /> : null;

export default ConnectSettings(
  connectActionSheet(withNavigation(ImageContainer))
);
