import React from "react";
import { Map } from "immutable";
import { View, FlatList } from "react-native";
import { WebBrowser } from "expo";
import { ActionButton } from "react-native-material-ui";
import { getThreadURL } from "../constants/Chan";
import Header from "../containers/Header";
import Loader from "../containers/Loader";
import SingleThread from "../components/SingleItem";
import Options from "../components/Options";

const styles = {
  listContainer: {
    marginLeft: -8,
    marginRight: -8,
    marginTop: -4,
    marginBottom: -4
  }
};

const Container = ({
  navigation: { state: { params: { no } } },
  posts,
  openReply,
  handleRef,
  handleLink,
  handlePostOptions
}) => (
  <View style={{ flex: 1 }}>
    <Header title={no.toString()} home={false} refresh={true} />
    {posts.size === 0 ? (
      <Loader />
    ) : (
      <FlatList
        ref={handleRef}
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        enableEmptySections={true}
        keyExtractor={({ index }) => index}
        data={posts.toJS().map((item, index) => ({
          ...item,
          index
        }))}
        renderItem={({ item }) => (
          <SingleThread
            handlePostOptions={handlePostOptions}
            onLink={handleLink}
            item={Map(item)}
            style={{
              paddingBottom: 15
            }}
          />
        )}
      />
    )}
    <ActionButton icon="chat-bubble" onPress={openReply} />
  </View>
);

class Posts extends React.unstable_AsyncComponent {
  state = { showOptions: false, optionsItem: null };

  listRef = null;

  componentDidMount() {
    this.props.requestPosts(
      this.props.navigation.state.params.board,
      this.props.navigation.state.params.no
    );
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.posts.size !== this.props.posts.size ||
      nextState.showOptions !== this.state.showOptions
    );
  }

  openReply() {
    WebBrowser.openBrowserAsync(
      getThreadURL(
        this.props.navigation.state.params.board,
        this.props.navigation.state.params.no
      )
    );
  }

  handleRef(ref) {
    this.listRef = ref;
  }

  handlePostOptions(item) {
    this.setState(() => ({ showOptions: true, optionsItem: item }));
  }

  requestOptionsClose() {
    this.setState(() => ({ showOptions: false }));
  }

  findItemIndexScrollTo(find) {
    const index = this.props.posts.reduce(
      (final, current, currentIndex) =>
        current.get("no") === find ? currentIndex : final,
      false
    );
    if (index !== false) {
      this.listRef.scrollToIndex({
        animate: true,
        index
      });
    }
  }

  handleLink(item, href) {
    if (href.indexOf("#p") > -1) {
      this.findItemIndexScrollTo(parseInt(href.replace("#p", "")));
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container
          handleRef={::this.handleRef}
          handleLink={::this.handleLink}
          handlePostOptions={::this.handlePostOptions}
          openReply={::this.openReply}
          {...this.props}
          {...this.state}
        />
        {this.state.showOptions && (
          <Options
            posts={this.props.posts}
            item={this.state.optionsItem}
            onClose={::this.requestOptionsClose}
          />
        )}
      </View>
    );
  }
}

export default Posts;
