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
  AsyncStorage
} from 'react-native';

import { List, InputItem, Button,Toast,  WhiteSpace } from 'antd-mobile';
import { Sign,Version,copyRight,getUser } from '../utils/api';
import { createForm } from 'rc-form';
import Index from './index';
const icons = require('../data/icons')
class Header extends Component {
  render() {
    return (
      	<View style={styles.view_header}>
      		<View style={styles.logo}>
      			<WhiteSpace />
      			<WhiteSpace />
      			<WhiteSpace />
      			<WhiteSpace />
      			<WhiteSpace />
      			<WhiteSpace />
	        	<Image source={{uri:icons.logo}} style={styles.img_pic}/>
	    	  </View>
	    	</View>

    );
  }
}

class Body extends Component {
   constructor(props) {
        super(props);
        this.state = {
          value:'',
          value1:''
        };
    }
   login = () => {
    // this.props.form.validateFields((error, value) => {
    //   // console.log(value.inputclear);
    //   let user = value.inputclear,
    //       psw = value.password?value.password:'';
    //       // console.info(user,psw);
    //   fetch(Sign,{method:'post',headers:{
		// 						"Content-Type": "application/x-www-form-urlencoded"
		// 					},body: `user=${user}&passwd=${psw}`})
    //         .then(res=>res.text())
    //         .then(data=>{
    //           let datas = data.slice(1,-1);
    //           let userInfo = JSON.parse(datas);
    //           AsyncStorage.setItem('userInfo',datas);
    //           switch(userInfo.msg){
    //             case 'Login OK':
    //               const { navigator } = this.props;
    //               if(navigator){
    //                 navigator.replace({
    //                   component:Index
    //                 });
    //               }
    //               break;
    //              case 'user not found':
    //               Toast.fail('不存在该用户 ',1);
    //               break;
    //             case 'passwd error':
    //               Toast.fail('密码错误',1);
    //               break;
    //           }
    //         })
    //         .catch(e=>Toast.fail('连接服务器超时，请稍后再试',1));
    // });
    const { navigator } = this.props;
      if(navigator){
        navigator.replace({
          component:Index
        });
      }
  };

  render() {
  	const { getFieldProps } = this.props.form;
    return (
        <View style={styles.view_body}>
	    	<View style={styles.form_box}>
	        	<View style={styles.form}>
				      <InputItem
				      	style={{ paddingLeft:18,borderBottomWidth:1,height:46}}
                onBlur={(text)=>{
                    if(text){
                      this.setState({value:text});
                    }else{
                      this.setState({value:'null'});
                    }
                }}
                error={this.state.value==='null'}
				        {...getFieldProps('inputclear')}
				        clear
				        placeholder="请输入账号"
				      >账户</InputItem>
				      <InputItem
                onBlur={(text)=>{
                    if(text){
                      this.setState({value:text});
                    }else{
                      this.setState({value:'null'});
                    }
                }}
                 error={this.state.value1==='null'}
				      	style={{borderBottomWidth:1,height:46,paddingLeft:18,}}
             			 onChange={(text)=>this.setState({psw:text})}
				        {...getFieldProps('password')}
				        type="password"
				        placeholder="请输入密码"
				      ><Text>密码</Text></InputItem>
	    		</View>
	 			<Button className="btn" type="primary" onClick={this.login}
	 			style={{ marginLeft:18 }}
	 			>登录</Button>
	    	</View>
        </View>
    );
  }
}

Body = createForm()(Body);


class Footer extends Component {
  render() {
    return (
      	<View style={styles.view_footer}>
      		<WhiteSpace />
      		<WhiteSpace />
      		<WhiteSpace />
      		<WhiteSpace />
      		<WhiteSpace />
      		<WhiteSpace />
      		<Text style={styles.footer_text1}>{Version}</Text>
    		  <Text style={styles.footer_text2}>{copyRight}</Text>
        </View>
    );
  }
}

export default class Login extends Component {
  render() {
    return (
    	<View style={styles.body}>
	        <Header />
	        <Body navigator={this.props.navigator}/>
	        <Footer/>
    	</View>
    );
  }
}



const styles = StyleSheet.create({
  body: {
	flex: 1 ,
	flexDirection: 'column',
  backgroundColor:'white',
  },

  view_header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

  },
  view_body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',


  },

  view_footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',

  },

  logo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,


  },

  img_pic: {
  	width:80,
  	height:80,
  	borderRadius:40,
  },

  form_box: {
    flex: 3,
    flexDirection: 'column',
    marginRight:18,

  },

  form: {
    flex: 1,
    flexDirection: 'column',

  },

  footer_text1:{
    color:'#108EE9',
    fontSize:14,
  },

  footer_text2:{
    color:'#108EE9',
    fontSize:10,
  },




});
