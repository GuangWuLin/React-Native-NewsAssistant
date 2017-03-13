import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import { SearchBar } from 'antd-mobile';

class Search extends Component {
  render() {
    return (
      	
      	<SearchBar placeholder="搜索"/>
       
    );
  }
}


export { Search as default };