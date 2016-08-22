import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

const {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    backgroundColor: '#FFF',
  },
});

class LazyLoader extends React.Component{

  static propTypes = {
    duration: PropTypes.number,
    loaderStyle: PropTypes.object,
    noSpinner: PropTypes.bool
  }

  constructor(props){
    super(props);

    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    this.timer = setTimeout(() => {
      this.setState({
        loading: false
      });
    }, this.props.duration || 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render(){
    if (this.state.loading) {
      return (
        <View style={[styles.container, this.props.loaderStyle]}>
          { this.props.noSpinner ? null : (<ActivityIndicator />)}
        </View>
      )
    } else {
      return this.props.children;
    }
  }
}

module.exports = LazyLoader;
