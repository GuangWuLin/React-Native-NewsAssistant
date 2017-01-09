import React,{Component} from 'react';
import { Image,StyleSheet,Text,View,TextInput,AsyncStorage,TouchableHighlight,Alert,Button,ToastAndroid } from 'react-native';
import { Login,getUser,copyRight } from './api';
import { getAllData,DataFromOut } from './util.js';
// 头像组件
class HeadImgComponent extends Component{
	constructor(props){
		super(props);
		this.state = { isLogin:this.props.isLogin }
	}
	backLogin(){
		Alert.alert('点了一下')
		// 点击头像后将登陆状态改为未登录 false 同时将标题改为 默认
		if(this.state.isLogin){
			let backLogin = false
			this.setState({isLogin:backLogin});
			// 触发事件 改变 父组件中的状态
			this.props.imgParent(backLogin);
		} 
		// 给主进程发信息 返回
	}
	render (){
		let isLogin = this.props.isLogin;
		let sex = isLogin?this.props.sex:'unkown';
		// Alert.alert(sex)
		let icon = sex=='male'?require('../assets/male.jpg'):(isLogin?require('../assets/female.jpg'):require('../assets/unkown.jpg'));
		return (
			<TouchableHighlight onPress={this.backLogin.bind(this)} style={style.myImgStyle}>
				<Image source={icon} style={{width:80,height:80,borderRadius:50}}/>
				{/*点击头像充值用户输入页面*/}
			</TouchableHighlight>
		)
	}
}
// 输入框组件
class EnterComponent extends Component{
	constructor(props){
		super(props);
		this.state = { isLogin:this.props.isLogin,userName:'',password:'',user:'' }
	}
	// 自动登录，暂时不考虑

	// 输入框改变状态 由输入账号转为输入密码
	changeType(){
		// 警告提示
			if(!this.props.flag){
			// 输入用户名
			if(!this.props.isLogin){
				fetch(getUser, {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					body: "user="+this.state.user
					})
					.then((res)=> {
						if (res.ok) {
							return res.text()
						} else if (res.status == 401) {
							Alert.alert("Oops! You are not authorized.");
						}
						}, (e)=> {
						console.info("Error submitting form!");
						})
					.then(data=>{
						let datas = JSON.parse(data.slice(1,-1)) // 对象格式的数据
						if(datas.code === 404){
							ToastAndroid.show('查无此人，请检查后再输入~',ToastAndroid.SHORT)
						}else if(datas.code === 200){
							// 返回码为 200 表示成功
							let sex = datas.data.sex?datas.data.sex:'male';
							// 系统未定义用户性别时 默认为 male
							let newState = [!this.props.isLogin,datas.data.title,sex,datas.data.user]
							// 设置新的登录状态 用户姓名 用户性别 用户登录名
							this.setState({isLogin:!this.props.isLogin,userName:datas.data.title,sex:sex,user:datas.data.user});
							// 存 用户新状态	(调用回调 )									
							this.props.enterParent(newState);
							// 输入框清除
							this.refs.myInput.clear();
						}
					})
					.catch(e=>console.warn(e));
			}else{
			// 输入用户密码
				let user = this.state.user;
				try{
					fetch(Login,{method: "POST",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						body: "user="+user+'&passwd='+this.state.password
						})
						.then(res=>{return res.text()})
						.then(data=>{
							let response = JSON.parse(data.slice(1,-1));
							if(response.msg === 'Login OK'){
								// 验证成功 登录成功
								var newFlag = [true,this.props.isLogin,user,this.state.password];
								// 触发事件 改变父组件方法
								this.props.oncallback1(newFlag)
							}else if(response.msg === 'passwd error'){
								Alert.alert('密码错误')
							}
						})
						.catch(e=>console.log(e))
				}catch(e){

				}
			}
		}
	}
	upDataText(text){
		this.setState({user:text})
	}
	render(){
		let flag = this.props.flag
		let isLogin = this.props.isLogin
		let Enter = !isLogin?'请输入账号 ...':'请输入密码 ...';
		return (
			<View style={style.myInputStyle}>
				{/* 文本输入，账号和密码 */}
				<TextInput ref='myInput' keyboardType={'default'} style={{width:160,color:'white'}} 
					maxLength={16} onChangeText={(text)=>this.upDataText(text)} password={true} placeholderTextColor='white' placeholder={`${Enter}`}  
					autoFocus={true} />
					{/* 按钮 */}
				<Button onPress={this.changeType.bind(this)} title="确定" color="powderblue" accessibilityLabel="按下确定"/> 
			</View>
		)
	}
}
// 登录模块组件
export default class LoginComponent extends Component{
	constructor(props){
		super(props);
		this.state = { isLogin:false,userName:'',sex:'unkown',user:'' }
	};
	onEnterChanged(newLogin) {
	// 响应子组件事件 改变自身状态
		this.setState({
		isLogin: newLogin[0],
		userName:newLogin[1],
		sex:newLogin[2],
		user:newLogin[3]
		});
	}
	onImgChanged(){
		this.setState({
			isLogin:false,
			userName:'',
			sex:'unkown',
			user:''
		})
	}
	// 触发事件 修改自己父组件的状态
	onChangeFlag(newFlag){
		this.props.oncallback(newFlag);
	}
	// 渲染视图
	render(){
		let amLogin = this.state.userName
		let sex = this.state.sex
		let flag = this.props.flag;
		// Alert.alert(sex)
		
		//console.warn(flag);
		return (
			<View style={style.container}>
				<HeadImgComponent isLogin={this.state.isLogin} imgParent={this.onImgChanged.bind(this)} sex={sex} />
				<Text style={style.myNameStyle}>{amLogin}</Text>
				<EnterComponent  isLogin={this.state.isLogin} enterParent={this.onEnterChanged.bind(this)} 
					flag = {flag} oncallback1={this.onChangeFlag.bind(this)}/>
				<Text style={style.myCopyStyle}>{ copyRight }</Text>
			</View>
			// <Text>Hello Kitty</Text>
		)
	}
}
var style = StyleSheet.create({
	container:{backgroundColor:'#0a2938',flex:1,justifyContent: 'space-around',alignItems: 'center'},
	myNameStyle:{color:'white',textAlign:'center',fontSize:25},
	myCopyStyle:{textAlign:'right',color:'powderblue',fontSize:9},
	myImgStyle:{width: 80,height: 80},
	myInputStyle:{height:34,borderRadius:5,width:200,alignSelf:'center',flexDirection:'row',justifyContent: 'space-between'}
})