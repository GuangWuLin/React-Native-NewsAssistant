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

import { InputItem, Button } from 'antd-mobile';

import { createForm } from 'rc-form';

import NavBar from './navbar.js';

class ChangePassword extends Component {
  
  render() {
    const { getFieldProps } = this.props.form;
    return (
        <View style={styles.view_body}>
          <NavBar title='修改密码' leftTitle='返回' goBack={()=>this.props.navigator.pop()}/>
          <View style={{flex:1,marginTop:30,}}>
              <View style={styles.pwd_box}>
                <Text style={styles.pwd}>新  密  码</Text>
                <InputItem
                  style={styles.pwd_input}
                  {...getFieldProps('passwordold')}
                  type="password"
                  placeholder="请输入旧密码"
                ></InputItem>
              </View>
              <View style={styles.pwd_box}>
                <Text style={styles.pwd}>新  密  码</Text>
                <InputItem
                  style={styles.pwd_input}
                  {...getFieldProps('passwordold')}
                  type="password"
                  placeholder="请输入旧密码"
                ></InputItem>
              </View>
              <View style={styles.pwd_box}>
                <Text style={styles.pwd}>确认密码</Text>
                <InputItem
                  style={styles.pwd_input}
                  {...getFieldProps('passwordnew')}
                  type="password"
                  placeholder="请再次输入新密码"
                ></InputItem>
              </View>
              <Button className="btn" type="primary" style={{ marginLeft:18,marginRight:18 ,marginTop:30,}}>确定</Button>
          </View>
        </View>
    );
  }
}

ChangePassword = createForm()(ChangePassword);


const styles = StyleSheet.create({

  view_body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:'#eee',
  },

  form_box: {
    flex: 1,
    flexDirection: 'column',
    marginTop:44,
    backgroundColor:'white'
  },

  pwd_box:{
    height:44,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft:18,
    paddingRight:18,
    backgroundColor:'white',
  },

  pwd:{
    flex:2,
    flexDirection: 'row',
    fontSize:16,
    color:'#656565',
    alignItems:'center',
    paddingTop:10,
  },

  pwd_input:{
    flex:7,
    flexDirection: 'row',
  },

});

export { ChangePassword as default };