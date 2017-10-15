import React from "react";
import { StatusBar, View } from "react-native";
import { Font } from "expo";
import { ThemeProvider as RNMUIThemeProvider } from "react-native-material-ui";
import Roboto from "../fonts/Roboto/Roboto-Regular.ttf";
import Loader from "./Loader";

/**
 * (1) Load default font.
 * (2) Inject custom theme.
 */
class ThemeProvider extends React.unstable_AsyncComponent {
  state = { loading: true };

  get theme() {
    return {
      card: {
        container: {
          ...this.props.cardStyle
        }
      }
    };
  }

  async componentDidMount() {
    await Font.loadAsync({ Roboto });
    this.setState(() => ({ loading: false }));
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return nextState.loading !== this.props.loading;
  }

  renderLoading() {
    return <Loader containerStyle={{ justifyContent: "center" }} />;
  }

  renderApp() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar {...this.props.header} barStyle="light-content" />
        {this.props.children}
      </View>
    );
  }

  render() {
    return (
      <RNMUIThemeProvider uiTheme={this.theme}>
        {this.state.loading ? this.renderLoading() : this.renderApp()}
      </RNMUIThemeProvider>
    );
  }
}

export default ThemeProvider;
