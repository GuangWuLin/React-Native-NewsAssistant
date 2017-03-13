import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import {TabBar} from 'antd-mobile';

// import Search from './search.js';

import TravelForm from './travelformlist';

const Edit = React.createClass({
  render() {
    return (
			<TravelForm navigator={this.props.navigator}/>
    );
  },
});


export { Edit as default };
