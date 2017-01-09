/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component,
} from 'react';

import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';

import LoginComponent from './newsAssistant/login.js';
import ContentComponent from './newsAssistant/content.js'
import ToastAndroidDemo from './newsAssistant/testdemo.js'
import SampleAppMovies from './moveis.js';
class MyFirstRN extends Component {
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
  render() {
    return (
      <App/>
    );
  }
}

class App extends Component{
				constructor(props){
					super(props);
          this.state = {flag:false,isLogin:false,list:[],user:''}
				}
				
				componentWillMount(){
					
					//console.log(this.state.flag)
					// let auto = localStorage.getItem('autoLogin');
					//console.info(auto)
					// 当设置为自动登录才调用这个
					// if(auto===true){
					// 	//console.log(111)
					// 	getAllData().then(val=>{
					// 		let arr = val[0].data;
					// 		// 获取到的全部数据
					// 		console.log(arr)
					// 		if(Array.isArray(arr) && arr.length>0){
					// 			// 遍历 全部数据
					// 			arr.forEach((c,i)=>{
					// 				// 当 某个数据的 oper 为 'delete' 时将其从数组中删除
					// 				c.oper === 'DELETE' && arr.splice(i,1);
					// 			});
					// 			// 仅当还未登录时 将整个数组发往 主进程
					// 			if(!this.props.flag){
					// 				arr = ipcRenderer.sendSync('FirstData',arr);
					// 				//console.info('all',arr)
					// 			}
					// 			// 改变状态
					// 			this.setState({list:arr})
					// 		}
					// 		//console.info(this.state.list)
					// 	},function(XMLHttpRequest){
					// 		//console.log(XMLHttpRequest)
					// 		XMLHttpRequest.statusText === 'timeout' && alert('请求超时')
					// 	}).catch(e=>{
					// 		console.log(e)
					// 		//alert('连接超时，请重试')
					// 	});
					// }
				}
				changeFlag(newFlag){
					this.setState({flag:newFlag[0],isLogin:newFlag[1],user:newFlag[2],password:newFlag[3]})
				}
				render(){
					var isLogin = this.state.isLogin;
          if(!this.state.flag){
            return <LoginComponent flag={this.state.flag} oncallback={this.changeFlag.bind(this)}/>
          }
					return <ContentComponent userCount={this.state.user} userPassWord={this.state.password}/>
				}
			}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});


AppRegistry.registerComponent('MyFirstRN', () => MyFirstRN);
