import React from "react";
import { View, Text, TouchableWithoutFeedback, WebBrowser } from "react-native";
import { withNavigation } from "react-navigation";
import { Icon } from "react-native-material-ui";
import HTML from "react-native-render-html";
import Filter from "bad-words";

import ConnectSettings from "../containers/Settings";

const filter = new Filter();

const styles = {
  span: {
    fontSize: 18,
    fontFamily: "Roboto"
  },
  a: {},
  br: {},
  "span.quote": {
    color: "green"
  }
};

const formatDescriptionString = (descStr, showBadWords) =>
  showBadWords ? descStr : filter.clean(descStr);

const getHTML = (item, showBadWords) =>
  "<span>%HTML%</span>"
    .split("%HTML%")
    .join(formatDescriptionString(item.get("com") || "", showBadWords));

const handlePress = ({ navigation, item, onLink }) => (_e, href) => {
  if (navigation.state.routeName === "Threads") {
    navigation.navigate("Posts", {
      board: navigation.state.params.board,
      no: item.get("no")
    });
  } else if (href.match(/#p([^/]+)/)) {
    onLink(item, href);
  } else {
    WebBrowser.openBrowserAsync(href);
  }
};

class Description extends React.unstable_AsyncComponent {
  get showOptions() {
    return (
      this.props.navigation.state.routeName === "Posts" && !this.props.hideMore
    );
  }

  handleMorePress(event) {
    event.stopPropagation();
    this.props.handlePostOptions(this.props.item);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <View style={{ padding: 15, paddingBottom: 0 }}>
        <View
          style={{
            marginBottom: 15,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {this.props.item.get("no")}
          </Text>
          {this.showOptions && (
            <TouchableWithoutFeedback onPress={::this.handleMorePress}>
              <View>
                <Icon name="more-vert" />
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        <HTML
          htmlStyles={styles}
          html={getHTML(this.props.item, this.props.showBadWords)}
          onLinkPress={handlePress(this.props)}
        />
      </View>
    );
  }
}

export default ConnectSettings(withNavigation(Description));
