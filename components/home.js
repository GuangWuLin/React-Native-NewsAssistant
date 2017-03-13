import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import Tag from './tag.js';


const Home = React.createClass({
  render() {
    return (
				<Tag navigator={this.props.navigator}/>
    );
  },
});

const styles = StyleSheet.create({
  view_home: {
  flex:1,
  marginBottom:100,
	flexDirection: 'column',
  },
})

export { Home as default };
