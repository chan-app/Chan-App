import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { Toolbar, Card } from "react-native-material-ui";
import { withNavigation } from "react-navigation";

const statusBarHeight = Platform.OS === "ios" ? 22 : StatusBar.currentHeight;

export const headerHeight = 56 + statusBarHeight;

const styles = {
  offset: {
    zIndex: 9,
    marginLeft: -8,
    marginRight: -8,
    marginTop: -4,
    marginBottom: -4
  },
  container: {
    paddingTop: statusBarHeight
  },
  iconPlaceholder: {
    width: 48,
    height: 48
  }
};

const header = ({
  title,
  home,
  refresh,
  header,
  updateSearchInput,
  refreshPosts,
  refreshThreads,
  navigation,
  handleSearchClose,
  onBack,
  onSubmitEditing = () => {}
}) => {
  const style = {
    container: { backgroundColor: header.backgroundColor }
  };

  const onLeftElementPress = () => {
    navigation.navigate("About");
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigation.goBack();
    }
  };

  const refreshHandle = () => {
    switch (navigation.state.routeName) {
      case "Threads": {
        const { board } = navigation.state.params;
        refreshThreads(board);
        break;
      }
      case "Posts": {
        const { board, no } = navigation.state.params;
        refreshPosts(board, no);
        break;
      }
      default: {
        alert("Something has gone horribly wrong.");
        break;
      }
    }
  };

  const attributes = home
    ? {
        leftElement: "info",
        onLeftElementPress,
        searchable: {
          autoFocus: true,
          placeholder: "Try Technology",
          onSearchClosed: () => updateSearchInput(""),
          onChangeText: updateSearchInput,
          onSubmitEditing: () => onSubmitEditing()
        }
      }
    : {
        leftElement: "arrow-back",
        onLeftElementPress: () => handleBack(),
        rightElement: refresh ? (
          "refresh"
        ) : (
          <View style={styles.iconPlaceholder} />
        ),
        onRightElementPress: () => refreshHandle()
      };

  return (
    <View style={styles.offset}>
      <Card>
        <View style={{ ...styles.container, ...header }}>
          <Toolbar style={style} centerElement={title} {...attributes} />
        </View>
      </Card>
    </View>
  );
};

export default withNavigation(header);
