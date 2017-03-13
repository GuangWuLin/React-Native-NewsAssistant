/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import { List, InputItem, Button, WingBlank, WhiteSpace } from 'antd-mobile';

import { createForm } from 'rc-form';
const icons = require('../data/icons');

export default class Success extends Component {
  render() {
    return (
    	<View style={styles.body}>
    			<View style={styles.box}>
				    <Image source={{uri:icons.jian}} style={styles.img_pic}/>
				    <WhiteSpace />
				    <Text style={styles.box_text1}>提交成功</Text>
				    <WhiteSpace />
				    <Text style={styles.box_text2}>等待经理批阅</Text>
		        </View>
		        <View  style={styles.space}></View>
    	</View>
    );
  }
}



const styles = StyleSheet.create({
  body: {
	flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#eee'
  },

   space: {
	flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

   box: {
	flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  box_text1: {
	fontSize:24,
	color:'#656565',
  },

   box_text2: {
	fontSize:14,
	color:'#989898',
  },



  img_pic: {
  	width:80,
  	height:80,
  	borderRadius:40,
  },

});
