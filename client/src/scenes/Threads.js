import React from "react";
import { Map } from "immutable";
import { View, ListView, Dimensions } from "react-native";
import Header from "../containers/Header";
import Loader from "../containers/Loader";
import SingleThread from "../components/SingleItem";

const styles = {
  listContainer: {
    marginLeft: -8,
    marginRight: -8,
    marginTop: -4,
    marginBottom: -4
  }
};

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

const Container = ({
  navigation: { state: { params: { title } } },
  threads,
  onEndReached
}) => (
  <View style={{ flex: 1 }}>
    <Header title={title} home={false} refresh={true} />
    {threads.size === 0 ? (
      <Loader />
    ) : (
      <ListView
        onEndReached={onEndReached}
        onEndReachedThreshold={Dimensions.get("window").height}
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
        enableEmptySections={true}
        dataSource={ds.cloneWithRows(threads.toJS())}
        renderRow={item => <SingleThread item={Map(item)} />}
      />
    )}
  </View>
);

class Threads extends React.unstable_AsyncComponent {
  state = { page: 1 };

  componentDidMount() {
    this.requestThreads();
  }

  componentWillUnmount() {
    this.props.clearThreads();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.threads.size === 0 && nextState.page !== 1) {
      this.setState(() => ({ page: 1 }));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.threads.size !== this.props.threads.size;
  }

  requestThreads() {
    this.props.requestThreads(
      this.props.navigation.state.params.board,
      this.state.page
    );
  }

  handleEndReached() {
    if (this.state.page < 10) {
      this.setState(({ page }) => ({ page: page + 1 }), ::this.requestThreads);
    }
  }

  render() {
    return (
      <Container
        {...this.props}
        {...this.state}
        onEndReached={::this.handleEndReached}
      />
    );
  }
}

export default Threads;
