import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ListView,
  Modal,
  ActivityIndicator,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import {InputItem,SwipeAction} from 'antd-mobile';
// import Swipeout from 'rc-swipeout/lib';
import DoLeave from './doleave';
import { todoList,GetNew } from '../utils/api' ;
import { CashTo3,keysrt } from '../utils/typeChange';
const icons = require('../data/icons.json');
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var moment = require('moment');
const DOUBAN_URL = 'http://api.douban.com/v2/movie/top250';
class  TagLeftContent extends  Component{
 constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      refreshing:false,
      dataArr:[],
      show:false,
      userInfo:{}
    };
    this.fetchData = this.fetchData.bind(this);
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


  async isLoaded(){
    let DataSourceArr = await AsyncStorage.getItem('DataSourceArr');
    DataSourceArr = JSON.parse(DataSourceArr);
    const dataArr = new Array();
    for(let o in DataSourceArr){
      dataArr.push(DataSourceArr[o]);
    }
    // console.log('ssss',dataArr)
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(dataArr),
      refreshing:false,
      dataArr:dataArr
    })
    // this.dataArr = DataSource;
  }
  componentDidMount() {
    // console.log('Left come');
    this.getUser();
  }
  async getUser(){
    let datas = await AsyncStorage.getItem('userInfo');
    datas = JSON.parse(datas);
    const userInfo = datas.data.user;
    this.setState({userInfo});
    this.fetchData();
    // console.log(userInfo);
  }
   async _onRefresh() {
      this.setState({refreshing: true});
      try{
        let res = await fetch(GetNew,{method:'post',headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
        },body: `guid=${this.state.userInfo.guid}`});
        let resData = await res.text();
        let lists = JSON.parse(resData.slice(1,-1));
        // console.log(lists)
        const todosNum = await AsyncStorage.getItem("DataSourceArr");
        let todoObj = JSON.parse(todosNum);
        // console.info(todoObj);
        let arr = [];
        for(var o in todoObj){
          arr.push(todoObj[o]);
        }
        // console.warn(Object.prototype.toString.call(lists.data));
        lists.data.forEach((c,i)=>{
          arr.forEach((v,j)=>{
            if(c.oper === 'DELETE'){
              if(c.id === v.id){
                arr.splice(j,1);
              }
            }else{
              if(c.id === v.id){
                arr[j] = lists.data[i];
              }
            }
          });
        });
        if(lists.data.length === 0){
          Toast.info('暂无新消息',1.5,null,false);
        }else{
          Toast.success('更新了'+lists.data.length+'条消息',1.5,null);
        }
        let num = arr.length.toString();
        await AsyncStorage.setItem("todosNum",num);
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(arr),
          refreshing:false,
          dataArr:arr
        });
      }catch(e){
        // console.log(e);
        Toast.fail('加载失败',1.5,null);
      }

  }

	 async fetchData(){
     try{
      let res = await fetch(DOUBAN_URL,{method:'get',headers:{
                  "Content-Type": "application/x-www-form-urlencoded"
      }})
      let lists = await res.json();
      // let lists = JSON.parse(resData.slice(1,-1));
      // console.info(lists.data)
      let num = lists.subjects.length.toString();
      // 存待办事宜 数目
      await AsyncStorage.setItem("todosNum",num);
      RCTDeviceEventEmitter.emit('todosNum',num);
      let listArr = lists.subjects.sort(keysrt('average',true));
      let listObj = {};
      listArr.forEach((c,i)=>{
        listObj[i] = c;
      });
      // console.log(JSON.stringify(listObj));
      let listObjs = JSON.stringify(listObj);
      // 存初始 待办事宜 数据
      await AsyncStorage.setItem("DataSourceArr",listObjs);
      this.setState({
          dataSource:this.state.dataSource.cloneWithRows(listArr),
          loaded:true,
          dataArr:listArr
      });
     }catch(e){
      //  console.log(e);
       this.isLoaded();
     }
  }
  render() {
  	if (!this.state.loaded) {
      return <ActivityIndicator
          size='large'
        color='#108ee9'
      />
    }
  	 return (
          <ListView
           dataSource={this.state.dataSource}
           renderRow={this.renderList.bind(this)}
           refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            colors={['white']}
            progressBackgroundColor="#108ee9"
         />
       }
    />
    );
  }

  onDelete(value) {
    const tempArr = this.state.dataArr;
    // console.log(tempArr)
    let newArr = tempArr.filter(v => v !== value);
    // console.log(newArr);
    this.setState({
      dataArr: newArr,
      dataSource:this.state.dataSource.cloneWithRows(newArr)
    });
    const num = newArr.length.toString();
    const arrObj = new Object();
    newArr.forEach((c,i)=>{
      arrObj[i] = c;
    })
    const newArrs = JSON.stringify(arrObj);
    AsyncStorage.setItem('DataSourceArr',newArrs);
    // console.log(this.isLoaded())
    // 将新的待办数目发给底部导航栏 index.js
    RCTDeviceEventEmitter.emit('todosNum',num);
    // console.log(this.state.dataArr)
  }

  goWhere = (messes)=>{
    // 向 Index 发送一个 自定义事件
    RCTDeviceEventEmitter.emit('change');
    // 向 路由栈 添加新的路由
    this.props.navigator.push({
      component:DoLeave,
      passProps:{
        title:messes.type,
        leftTitle:'返回'
      }
    })
  }

  renderList(messes) {
    // let money = messes.amount;
    // let date = messes.date.substr(0,10);
    // let title = messes.title.slice(0,10);
    // // console.info(title)
    // title = title.length>8?title + '...':title;
    // money += '';
    // money = CashTo3(money);
    // money = money.length===0?'0.00':money;
    // let count = messes.count;
    // count = count?count:0;
  	 return (
          <SwipeAction
            autoClose
            right={[
              {
                text: '驳回',
                onPress: () => this._rightButtonClick(),
                style: { backgroundColor: '#F4333C', color: 'white' },
              },
              {
                text: '同意',
                onPress: () => this.onDelete(messes),
                style: { backgroundColor: '#108ee9', color: 'white' },
              },
            ]}
            onOpen={() => console.log('global open')}
            onClose={() => console.log('global close')}
          >
	    			<TouchableOpacity onPress={()=>this.goWhere(messes)}>
	          	<View style={styles.List_Item}>
			          {/*<Image source={{uri:icons[messes.type]}}   style={ styles.List_pic }/>
			          <View style={styles.rightContainer}>
                  <Text style={styles.List_Item_Text}>{messes.creater}</Text>
                  <Text style = { styles.List_Brief }>{title}</Text>
                  <Text style = { styles.List_Text }>{moment(date).fromNow()}</Text>
                  <Text style={ styles.List_extra }>{messes.type==='请假单'?count+'天':'￥'+money}</Text>
			          </View>*/}
                <View>
                  <Image source={{uri:messes.images.large}} style={ styles.List_pic }/>
                </View>
                <View>
                  <Text>{messes.title}</Text>
                  <Text>{messes.original_title} ({messes.year})</Text>
                  <Text>{messes.rating.average}</Text>
                </View>
			        </View>
	          </TouchableOpacity>
            </SwipeAction>
	         );
  }
}

export { TagLeftContent as default };

const styles = StyleSheet.create({
	List_Item: {
		flex: 1,
    flexDirection: 'row',
    backgroundColor:'white',
    paddingLeft:18,
    paddingRight:18,
    marginBottom:0.5,
    marginTop:0.5,
    paddingTop:12,
    paddingBottom:12,
 }
 ,
  List_flag_Text1: {
  	position: 'absolute',
		top: 2,
		right:0 ,
		fontSize:9 ,
		color:'#FF9900',
		borderWidth:.5,
		paddingLeft: 4,
		paddingRight:4,
		paddingTop:1,
		borderRadius:4,
		borderColor:'#949494',
  },
  rightContainer: {
    flex: 1,
  },

  List_pic: {
		width:44,
		height:44 ,
		marginRight:18,
    borderRadius:6
  },


  List_Item_Text: {
		fontSize:16 ,
    fontWeight:'300',
		color:'#656565',
  },

  List_extra: {
		position: 'absolute',
		top: 20,
		right: 0,
		color:'#000' ,
		fontSize:18 ,
  },

  List_Brief: {
		  fontSize:13 ,
			color:'#CCCCCC',
  },

  List_Text: {
  	position: 'absolute',
		top: 0,
		right:0,
		fontSize:13 ,
		color:'#CCCCCC',
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
