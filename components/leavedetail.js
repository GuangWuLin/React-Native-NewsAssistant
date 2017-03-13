import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  AsyncStorage
} from 'react-native';

import { Steps, Icon ,WingBlank} from 'antd-mobile';
const Step = Steps.Step;

import NavBar from './navbar.js';

// 如果不是使用 List.Item 作为 children


class LeaveDetail extends Component{
    constructor(props) {
      super(props);
      this.state = {
		  title:'',
		  leftTitle:'',
		  userInfo:{}
      };
    }
	componentDidMount(){
		this.getDatas();
	}
	async getDatas(){
		let res = await AsyncStorage.getItem('userInfo');
		let datas = JSON.parse(res);
		let userInfo = datas.data.user;
		this.setState({
			userInfo,
			title:this.props.title,
			leftTitle:this.props.leftTitle
		})
		console.info(this.state.userInfo);
	}
   render() {
	   const userInfo = this.state.userInfo;
    return (
      <ScrollView>
    	 <View style={styles.box}>
            <NavBar title={this.state.title} leftTitle={this.state.leftTitle} goBack={()=>this.props.navigator.pop()}/>
	        <View style={styles.box1}>

		        	<View style={styles.List_Item} >

				        <Text style={ styles.List_extra }>请假3天</Text>

				        <Text style = { styles.List_Text }>单据编号:QJD201702_0001</Text>

			        	<Text style={styles.List_Item_Text}>{userInfo.title}</Text>

			        	<Text style = { styles.List_Brief }>{userInfo.depart}</Text>
			        </View>


		        	<View style={ styles.Input_form }>
				        <Text style={styles.Input}>请假理由</Text>
				        <Text style = { styles.Input_right }>病假</Text>
			        </View>

			        <View style={ styles.Input_form }>
				        <Text style={styles.Input}>请假时间</Text>
				        <Text style = { styles.Input_right }>2017/02/09 - 2017/02/11</Text>
			        </View>

			        <View style={ styles.Textarea_form }>
				        <Text style={ styles.Textarea }>请假理由</Text>
				        <Text style={ styles.Textareac }>x心情不好</Text>
				        <Image source={{uri:"https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg"}} style={styles.img_pic}/>
			        </View>
			    </View>
          <View style={{paddingLeft:18,paddingRight:18,marginBottom:50,marginTop:6,overflow:'hidden',backgroundColor:'white'}}>
                <Text style={{fontSize:14,color:'#999',paddingBottom:12,paddingTop:12}}>单据流程</Text>
                <Steps size="small" current={1}>
                  <Step title={<Text style={{color:'#666',fontSize:12}}>提交单据2017/02/29</Text>}/>
                  <Step title={<Text style={{color:'#666',fontSize:12}}>王保存批准2017/02/29</Text>}/>
                  <Step title={<Text style={{color:'#666',fontSize:12}}>梁晓燕批准2017/02/29</Text>} />
                </Steps>
          </View>
       </View>
    </ScrollView>
	);
  }
}

export { LeaveDetail as default };

const styles = StyleSheet.create({
  box:{
  	flex: 1 ,
		flexDirection: 'column',
		backgroundColor:'#eee',
  },
  box1:{
  	flex: 19,
		flexDirection: 'column',
  },
  List_Item: {
  	  height:69,
			backgroundColor:'white',
			paddingLeft:18,
		  paddingRight:18,
			marginTop:12,
			marginBottom: 6,
  },


  List_Item_Text: {
  	paddingTop:10,
		fontSize:16 ,
		color:'#333333'
  },

  List_extra: {
		position: 'absolute',
		top: 40,
		left:200,
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
		left:200,
		fontSize:12 ,
		color:'#999999',
  },

  Input_form:{
  		backgroundColor:'white',
			paddingLeft:18,
		  paddingRight:18,
			height:44,
			marginTop:6,
			marginBottom: 6,
  },


  Input:{
  	paddingTop:10,
  	fontSize:16 ,
	  color:'#656565',
  },

  Input_right:{
  	position: 'absolute',
	  top: 10,
    left:100,
  	fontSize:16 ,
	  color:'#656565',
  },


   Textarea_form:{
  		backgroundColor:'white',
			paddingLeft:18,
		  paddingRight:18,
			marginTop:6,
			marginBottom: 6,
  },


  Textarea:{
  	fontSize:16 ,
	  color:'#666666',
	  paddingBottom:12,
    paddingTop:6
  },

  Textareac:{
  	fontSize:14 ,
	  color:'#666666',
	  paddingBottom:30,

  },

  img_pic:{
  	paddingLeft:18,
		paddingRight:18,
		marginBottom: 12,
  	width:84,
  	height:84,
  	overflow:'hidden',
  },

 })
