import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import TravelForm from './travelform';

import { List } from 'antd-mobile';
import LeaveTable from './leavetable';
const Item = List.Item;
const Brief = Item.Brief;

const icons = require('../data/icons.json');
class  TravelFormList extends  Component{
 static getDefaultProps = {
    thumb:'',
    title:''
 }

  render() {
  	 return (
        <TouchableOpacity style={styles.List_Item}>
            <View style={styles.rightContainer}>
              <Item
                style={{backgroundColor:'white'}}
                thumb={this.props.thumb}
                arrow="horizontal"
                onClick={() => this.props.navigator.push({component:this.props.component,passProps:{title:this.props.title,leftTitle:'返回'}})}
              >{this.props.title}</Item>
            </View>
        </TouchableOpacity>
    );
  }
};

class  TravelFormLists extends  Component{
  render() {
  	 return (
       <View style={{flex:1}} >
         <View style={{height:51,backgroundColor:'#108EE9',justifyContent: 'center',alignItems: 'center',flexDirection: 'column',}}>
            <Text style={{color:'white',fontSize:18}}>请选择单据类型</Text>
         </View>
        <TravelFormList title='请假单' thumb={icons['请假单']} component={LeaveTable} navigator={this.props.navigator}/>
        <TravelFormList title='合同付款申请书' thumb={icons['合同付款申请书']} component={LeaveTable} navigator={this.props.navigator}/>
        <TravelFormList title='借款单' thumb={icons['借款单']} component={LeaveTable} navigator={this.props.navigator}/>
        <TravelFormList title='差旅费报销' thumb={icons['差旅费报销']} component={TravelForm} navigator={this.props.navigator}/>
        <TravelFormList title='报销凭证' thumb={icons['报销凭证']} component={LeaveTable} navigator={this.props.navigator}/>
       </View>
    );
  }
};



export { TravelFormLists as default };
const styles = StyleSheet.create({
	List_Item: {
    flexDirection: 'row',
    backgroundColor:'white',
    paddingTop:6,
    paddingBottom:6,
 },

  rightContainer: {
    flex: 1,
  },

  List_Item_Text: {
		fontSize:16 ,
    fontWeight:'300',
		color:'#656565',
  },



 })
