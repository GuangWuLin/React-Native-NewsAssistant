import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  Linking,
  Alert,
  TouchableOpacity,
	AsyncStorage
} from 'react-native';

import {
  isFirstTime,
  isRolledBack,
  packageVersion,
  currentVersion,
  checkUpdate,
  downloadUpdate,
  switchVersion,
  switchVersionLater,
  markSuccess,
} from 'react-native-update';

import {WhiteSpace ,WingBlank,Button,Toast} from 'antd-mobile';

import ChangePSW from './changepassword';

import Login from './login';
import MyProject from './info';

import Up from '../test';
const icons = require('../data/icons');
import _updateConfig from '../update.json';
const {appKey} = _updateConfig[Platform.OS];


class Mine extends Component{
  constructor(props) {
    super(props);
    this.state = {userInfo:{}}
  }
	componentDidMount(){
    this.getDatas();
  }
  componentWillMount() {
    if (isFirstTime) {
      Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
        {text: '是', onPress: ()=>{throw new Error('模拟启动失败,请重启应用')}},
        {text: '否', onPress: ()=>{markSuccess()}},
      ]);
    } else if (isRolledBack) {
      Toast.fail('刚刚更新失败了,版本被回滚.');
    }
  }
  async getDatas(){
    let res = await AsyncStorage.getItem('userInfo');
    let datas = JSON.parse(res);
    let userInfo = datas.data.user;
    this.setState({
      userInfo
    })
    console.info(this.state.userInfo);
  }
	changePsw(){
		// if(this.props.navigator) alert(10000)
		this.props.navigator.push({
			component:ChangePSW
		});
	}
	logout(){
		this.props.navigator.resetTo({component:Login});
		AsyncStorage.clear();
	}
  doUpdate = info => {
    downloadUpdate(info).then(hash => {
      Alert.alert('提示', '下载完毕,是否重启应用?', [
        {text: '是', onPress: ()=>{switchVersion(hash);}},
        {text: '否',},
        {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
      ]);
    }).catch(err => { 
      Toast.fail('更新失败.');
    })
  };
  checkUpdate = () => {
    checkUpdate(appKey).then(info => {
      if (info.expired) {
        Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
          {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
        ]);
      } else if (info.upToDate) {
        Alert.alert('提示', '您的应用版本已是最新.');
      } else {
        Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
          {text: '是', onPress: ()=>{this.doUpdate(info)}},
          {text: '否',},
        ]);
      }
    }).catch(err => { 
      Toast.fail('更新失败.');
    });
  };

  render() {
		const userInfo = this.state.userInfo;
    return (
    <View
    style={{
    	flex: 1 ,
    	flexDirection: 'column',
			backgroundColor:'white'
    	}}
    >
    	<View  style={ styles.view_mine}>
							<View  style={styles.pic_box}>
									<Image source={{uri:icons.person}} style={styles.img_pic}/>
									<WhiteSpace />
									<WhiteSpace />
									
									<Text style={styles.name}>{userInfo.title}</Text>
							</View>

							<View style={ styles.Input_form }>
				        <Text style={styles.Input}>账户名</Text>
				        <Text style = { styles.Input_right }>{userInfo.user}</Text>
			        </View>

			        <TouchableOpacity onPress={()=>this.changePsw()}>
				        <View style={ styles.Input_form }>
					        <Text style={styles.Input}>修改密码</Text>
					        <Image source={{uri:icons.right}} style={styles.right_icon}/>
									
				        </View>
				 			</TouchableOpacity>

               <TouchableOpacity onPress={this.checkUpdate}>
                <View style={ styles.Input_form }>
                  <Text style={styles.Input}>检查更新</Text>
                  <Image source={{uri:icons.right}} style={styles.right_icon}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>this.props.navigator.push({component:MyProject})}>
                <View style={ styles.Input_form }>
                  <Text style={styles.Input}>关于 Anote</Text>
                  <Image source={{uri:icons.right}} style={styles.right_icon}/>
                </View>
              </TouchableOpacity>
				 			<TouchableOpacity onPress={()=>this.logout()}>
				        <View style={styles.btn_box}>
				 					<Text style={styles.btn}>退出账号</Text>
				 			 </View>
				 			</TouchableOpacity>
			</View>
		</View>
    );
  }
}


const styles = StyleSheet.create({
  view_mine: {
    	flex: 1 ,
			flexDirection: 'column',
      paddingLeft:18,
      paddingRight:18,
  },

  name:{
  	color:'#333333',
  	fontSize:16,
  },

  pic_box:{
  	justifyContent: 'center',
    alignItems: 'center',
  },

   img_pic: {
  	width:80,
  	height:80,
  	marginTop:77,
  	borderRadius:40,
  },

  Input_form:{
  	paddingTop:11,
    paddingBottom:11,
    borderBottomWidth:0.5,
    borderColor:'#ebebeb',
  },


  Input:{
  	fontSize:16 ,
	  color:'#656565',
  },

  Input_right:{
  	position: 'absolute',
	  top: 11,
    right:10,
  	fontSize:16 ,
	  color:'#989898',
  },

  right_icon:{
  	position: 'absolute',
	  top: 14,
    right:10,
		width:14,
		height:14
  },

  btn_box:{
  	justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    borderColor:'tomato',
    height:44,
    borderRadius:4,
    marginTop:18,
  },

 btn:{
  	fontSize:18,
  	color:'tomato',

  },

})

export { Mine as default };
