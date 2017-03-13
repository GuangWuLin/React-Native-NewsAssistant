import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import {  List, WhiteSpace , InputItem ,Button , Toast} from 'antd-mobile';


import { createForm ,} from 'rc-form';

import NavBar from './navbar.js';

// 如果不是使用 List.Item 作为 children

function successToast() {
  	Toast.success('操作成功');
};


class DoLeave extends Component{
    // 构造函数
    constructor(props) {
      super(props);
      this.state = {
        show:false,
        userInfo:{}
      };
    }

    // 加载完成
    componentDidMount(){
      this.getUser();
    }
    async getUser(){
      const userInfos = await AsyncStorage.getItem('userInfo');
      let obj = JSON.parse(userInfos);
      let userInfo = obj.data.user;
      this.setState({userInfo})
    }

    _rightButtonClick() {
      //
      this._setModalVisible();
    }

    // 显示/隐藏 modal
    _setModalVisible() {
      let isShow = this.state.show;
      this.setState({
        show:!isShow,
      });
    }


   render() {
    const { getFieldProps } = this.props.form;
    console.info(this.state.userInfo)
    const userInfo = this.state.userInfo;
    return (
    	 <View style={styles.box}>
          <NavBar title={this.props.title} leftTitle={this.props.leftTitle} goBack={()=>this.props.navigator.pop()}/>
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
				        <Text style={ styles.Textarea }>请假时间</Text>
				        <Text style={ styles.Textareac }>x心情不好</Text>
				        <Image source={{uri:"https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg"}} style={styles.img_pic}/>
			        </View>
			    </View>
			    <View style={styles.box2}>
				    	<View style={styles.boxrow}>
				    		<Button
				    		className="btn"
				    		type="warning"
				    		size='small'
				    		style={styles.btn1}
				    		onClick={this._rightButtonClick.bind(this)}
				    		>不同意</Button>
				    		<View style={styles.space}></View>
				    		<Button
				    		className="btn"
				    		type="primary"
				    		size='small'
				    		style={styles.btn2}
				    		onClick={successToast}
				    		>同意</Button>
				    	</View>
				</View>


        <Modal
          animationType='fade'
          transparent={true}
          visible={this.state.show}
          onShow={() => {}}
          onRequestClose={() => {}} >
          <View style={styles.modalStyle}>
            <View style={styles.subView}>
              <Text style={styles.titleText}>
                提示
              </Text>
              <Text style={styles.contentText}>
                请说明理由
              </Text>
              <View>
                <InputItem
                 {...getFieldProps('inputclear')}
                 style={{  paddingLeft:18, paddingRight:18,}}
                 placeholder="就是不同意，没有为什么"
               ></InputItem>
              </View>
              <View style={styles.horizontalLine} />
              <View style={styles.buttonView}>
                <TouchableHighlight underlayColor='transparent'
                  style={styles.buttonStyle}
                  onPress={this._setModalVisible.bind(this)}>
                  <Text style={styles.buttonText}>
                    取消
                  </Text>
                </TouchableHighlight>
                <View style={styles.verticalLine} />
                <TouchableHighlight underlayColor='transparent'
                  style={styles.buttonStyle}
                  onPress={this._setModalVisible.bind(this)}>
                  <Text style={styles.buttonText}>
                    确定
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
       </View>
	);
  }
}

DoLeave = createForm()(DoLeave);

export { DoLeave as default };

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

  box2:{
  	height:44,
		flexDirection: 'column',
		borderColor:'#ccc',
		borderTopWidth:1,
		paddingTop:9,
    paddingBottom:9,
    paddingLeft:18,
    paddingRight:18,
    alignItems: 'center',

  },

   boxrow:{
  	flex: 1 ,
		flexDirection: 'row',
  },

  List_Item: {
  	  height:69,
			backgroundColor:'white',
			paddingLeft:18,
		  paddingRight:18,

			marginTop:6,
			marginBottom: 6,
  },


  btn1:{
  	flex: 1 ,
    justifyContent: 'center',
    alignItems: 'center',

  },

  space:{
  	flex: 1 ,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btn2:{
  	flex: 1 ,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth:1,
    borderColor:'#ccc',

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
	  paddingBottom:18,
  },

  Textareac:{
  	fontSize:14 ,
	  color:'#666666',
	  paddingBottom:30,

  },

  img_pic:{
  	paddingLeft:18,
		paddingRight:18,
		marginTop:6,
		marginBottom: 6,
  	width:84,
  	height:84,
  	overflow:'hidden',
  },

  modalStyle: {
    alignItems: 'center',
    justifyContent:'center',
    flex:1,
  },
  // modal上子View的样式
  subView:{
    marginLeft:60,
    marginRight:60,
    backgroundColor:'#fff',
    alignSelf: 'stretch',
    justifyContent:'center',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor:'#ccc',
  },
  // 标题
  titleText:{
    marginTop:10,
    marginBottom:5,
    fontSize:16,
    fontWeight:'bold',
    textAlign:'center',
  },
  // 内容
  contentText:{
    color:'#333333',
    margin:8,
    fontSize:13,
    textAlign:'center',
  },
  // 水平的分割线
  horizontalLine:{
    marginTop:5,
    height:0.5,
    backgroundColor:'#ccc',
  },
  // 按钮
  buttonView:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle:{
    flex:1,
    height:44,
    alignItems: 'center',
    justifyContent:'center',
  },
  // 竖直的分割线
  verticalLine:{
    width:0.5,
    height:44,
    backgroundColor:'#ccc',
  },
  buttonText:{
    fontSize:16,
    color:'#3393F2',
    textAlign:'center',
  },

 })
