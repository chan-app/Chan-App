import React from "react";
import { Map } from "immutable";
import { curry } from "lodash";
import { View, Text, FlatList, Animated } from "react-native";
import { Card, Icon } from "react-native-material-ui";
import Header from "../containers/Header";
import Loader from "../containers/Loader";

/**
 * Styles.
 */
const styles = {
  list: {
    paddingTop: 4,
    paddingBottom: 4
  },
  board: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  boardLeft: {
    flex: 1,
    flexDirection: "row"
  },
  boardRight: {
    paddingLeft: 15
  },
  text: {}
};

/**
 * Child component.
 */
class SingleBoard extends React.unstable_AsyncComponent {
  animation = new Animated.Value(0);

  componentDidMount() {
    this.show();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.item.get("board") !== this.props.item.get("board");
  }

  componentWillUpdate() {
    this.hide();
  }

  componentDidUpdate() {
    this.show();
  }

  show() {
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true
    }).start();
  }

  hide() {
    Animated.timing(this.animation, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true
    }).start();
  }

  render() {
    return (
      <Animated.View style={{ opacity: this.animation }}>
        <Card onPress={this.props.onPress(this.props.item)}>
          <View style={styles.board}>
            <View style={styles.boardLeft}>
              <Text style={this.props.textStyles} numberOfLines={1}>
                /{this.props.item.get("board")}/ -{" "}
                {this.props.item.get("title")}
              </Text>
            </View>
            <View style={styles.boardRight}>
              <Icon name="arrow-forward" />
            </View>
          </View>
        </Card>
      </Animated.View>
    );
  }
}

/**
 * Component.
 */
class Boards extends React.unstable_AsyncComponent {
  get loading() {
    const { boards, searchInput } = this.props;
    return boards.size === 0 && searchInput === "";
  }

  get listData() {
    return this.props.boards.toJS().map((item, index) => ({
      ...item,
      index
    }));
  }

  get listProps() {
    return {
      style: styles.list,
      keyExtractor: ({ index }) => index,
      showsVerticalScrollIndicator: false,
      data: this.listData,
      renderItem: ::this.renderItem
    };
  }

  componentDidMount() {
    this.props.requestBoards();
  }

  shouldComponentUpdate({ boards: { size } }) {
    return size !== this.props.boards.size;
  }

  handlePress(item, _event) {
    this.props.navigation.navigate("Threads", {
      board: item.get("board"),
      title: item.get("title")
    });
  }

  handleSubmitEditing() {
    const item = this.props.boards.first();
    item && this.handlePress(item);
  }

  renderItem({ item }, key) {
    return (
      <SingleBoard
        key={key}
        item={Map(item)}
        textStyles={this.props.textStyles}
        onPress={curry(::this.handlePress)}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          title="Chan App"
          home={true}
          refresh={false}
          onSubmitEditing={::this.handleSubmitEditing}
        />
        {this.loading ? <Loader /> : <FlatList {...this.listProps} />}
      </View>
    );
  }
}

export default Boards;
