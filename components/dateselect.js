import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import { DatePicker, List, Button,WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import moment from 'moment';
import 'moment/locale/zh-cn';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
const icons = require('../data/icons');
const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

// 如果不是使用 List.Item 作为 children

let Dateselect = React.createClass({
  getInitialState() {
    return {
      date: zhNow,
      dpValue: null,
      visible: false,
    };
  },
  onChange(date) {
    // console.log('onChange', date);
    this.setState({
      date,
    });
  },
  render() {
    const { getFieldProps } = this.props.form;
    return (
    	<View>
	    	<List  style={{marginTop:6,marginBottom:6}}>
		          <DatePicker
			          mode="date"
			          title="选择日期"
			          {...getFieldProps('date1', {
			            initialValue: zhNow,
			          })}
			          minDate={minDate}
			          maxDate={maxDate}
			          >
			          <List.Item>
			          	<Text  style={styles.picker_text}>开始日期</Text>
			          </List.Item>
		        	</DatePicker>
		        	<Image source={{uri:icons.date}}  style={ styles.date_pic }/>
	      </List>

		    <List  style={{marginTop:6,marginBottom:6}}>
		          <DatePicker
			          mode="date"
			          title="选择日期"
			          {...getFieldProps('date2', {
			            initialValue: zhNow,
			          })}
			          minDate={minDate}
			          maxDate={maxDate}
			          >
			          <List.Item>
			          	<Text  style={styles.picker_text}>结束日期</Text>
			          </List.Item>
		        	</DatePicker>
		        	<Image source={{uri:icons.date}}  style={ styles.date_pic }/>
	      </List>
      </View>
    );
  },
});


Dateselect = createForm()(Dateselect);
export { Dateselect as default };
const styles = StyleSheet.create({
  picker_text:{
  	fontSize:16 ,
		color:'#656565',
  },

  date_pic:{
  	position: 'absolute',
		top: 15,
		right: 10,
  },


 })
