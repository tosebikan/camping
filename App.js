import React,{Component} from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends Component {
  state = {
    isLoadingComplete: false
  };



  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={() => {}}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
          <AppNavigator />
        </View>
      );
    }
  }

            _handleLoadingError = (error) => {
            // In this case, you might want to report the error to your error
              // reporting service, for example Sentry
              console.warn(error);
            };

 _handleFinishLoading = () => {
   this.setState({ isLoadingComplete: true });
 };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
