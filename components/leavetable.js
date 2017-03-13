import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  ScrollView
} from 'react-native';

import { Picker, List, TextareaItem, InputItem ,Button ,Toast} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;

import { createForm ,} from 'rc-form';

import { district, provinceLite as province } from 'antd-mobile-demo-data';

import NavBar from './navbar.js';

import Dateselect from './dateselect.js';

import Textarea from './textarea.js';

import ImagePicker from './imagepicker.js';

// 如果不是使用 List.Item 作为 children

const LeaveTable = React.createClass({
  getInitialState() {
    return {
      data: [],
      cols: 1,
      pickerValue: [],
      userInfo:{}
    };
  },
  componentDidMount(){
    this.getDatas();
  },
  async getDatas(){
    let res = await AsyncStorage.getItem('userInfo');
    let datas = JSON.parse(res);
    let userInfo = datas.data.user;
    this.setState({
      userInfo
    })
    // console.info(this.state.userInfo);
  },
  upload(){
    // this.props.form.validateFields((error, value) => {
    //   console.log(error,value);
    // });
    console.log(this.props.form.getFieldInstance('baozu')) // use this to get district
  },
  render() {
    const { getFieldProps } = this.props.form;
    const userInfo = this.state.userInfo;
    return (
      <ScrollView>
        <View style={{backgroundColor:'#eee',flex: 1 ,flexDirection: 'column', }} {...getFieldProps('baozu')}>
              <NavBar title='请假单' leftTitle='返回' goBack={()=>this.props.navigator.pop()} />
  	        	<View style={styles.List_Item} >
  			        <Text style={ styles.List_extra }>请假3天</Text>
  			        <Text style = { styles.List_Text }>单据编号:QJD201702_0001</Text>
  		        	<Text style={styles.List_Item_Text}>{userInfo.title}</Text>
  		        	<Text style = { styles.List_Brief }>{userInfo.depart}</Text>
  		   			</View>
    		    <List  style={{marginTop:6,marginBottom:6}}>
    	        <Picker
    		        data={district}
                {...getFieldProps('district')}
    		        title="选择种类"
    		        extra={<Text  style={styles.picker_extra} />}
    		        value={this.state.pickerValue}
    		        onChange={(v) => this.setState({ pickerValue: v })}
    		      >
    	        <Item arrow="horizontal"><Text  style={styles.picker_text}>请休假种类</Text></Item>
    	        </Picker>
    				</List>
  	        <Dateselect 
                {...getFieldProps('typePick')}
            />
  	        <Textarea />
  	 				<ImagePicker />
  			 		<Button className="btn" type="primary" style={{ marginTop:6, marginBottom: 6, marginLeft:18, marginRight:18 }} onClick={this.upload}>提交</Button>
       </View>
     </ScrollView>
	);
  },
});

LeaveTable = createForm()(LeaveTable);

export { LeaveTable as default };

const styles = StyleSheet.create({
	List_Item: {
		height:69,
		paddingTop:10,
		backgroundColor:'white',
		paddingLeft:18,
		paddingRight:18,
		marginTop:12,
		marginBottom: 6,
  },

  List_Item_Text: {
		fontSize:16 ,
		color:'#333333'
  },

  List_extra: {
		position: 'absolute',
		top: 40,
		left: 200,
		color:'#333333' ,
		fontSize:16 ,
  },

  List_Brief: {
  		paddingTop:10,
		  fontSize:16 ,
			color:'#333333',
  },


  List_Text: {
  	position: 'absolute',
		top: 12,
		left: 200,
		fontSize:12 ,
		color:'#999999',
  },

  picker_text:{
  	fontSize:16 ,
		color:'#656565',
  },

  picker_extra:{
  	fontSize:16 ,
		color:'#999999',
  },
 })
