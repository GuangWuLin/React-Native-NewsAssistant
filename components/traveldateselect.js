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

const zhNow = moment().locale('zh-cn').utcOffset(8);
const maxDate = moment('2018-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

const maxTime = moment('22:00 +0800', 'HH:mm Z').utcOffset(8);
const minTime = moment('00:30 +0800', 'HH:mm Z').utcOffset(8);

const gmtNow = moment().utcOffset(0);
const icons = require('../data/icons');

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
    	<View
    		style={{
          flex:1,
			    flexDirection: 'row',
			    backgroundColor:'white',
			    height:30,
          justifyContent: 'center',
          alignItems: 'center',
    		}}
    	>
        <Image source={{uri:icons.date}}/>
    		<View style={{flex:1}}>
            <DatePicker
                 mode="date"
                 title="选择日期"
                 extra={<Text style={{color:'#999999',fontSize:17,}}>2017-02-24</Text>}
                 value={this.state.dpValue}
                 onChange={v => this.setState({ dpValue: v })}
                 >
                 <List.Item  style={{position:'relative',left:-130,width:250,}}></List.Item>
            </DatePicker>
		    </View>

        <Image source={{uri:icons.date}} style={{position:'relative',right:38,top:0,width:16,height:16}}/>

				<View style={{flex:1}}>
        <DatePicker
             mode="date"
             title="选择日期"
             extra={<Text style={{color:'#999999',fontSize:17,}}>请选择时间</Text>}
             value={this.state.dpValue}
             onChange={v => this.setState({ dpValue: v })}
             >
             <List.Item  style={{position:'relative',left:-118,width:250,}}></List.Item>
        </DatePicker>
		    </View>
        <Image source={{uri:icons.date}} style={{position:'relative',right:18,top:0,width:16,height:16}}/>

      </View>
    );
  },
});


Dateselect = createForm()(Dateselect);
export { Dateselect as default };
