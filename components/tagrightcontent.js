import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ListView,
  ActivityIndicator,
  Navigator,
  AsyncStorage,
  RefreshControl
} from 'react-native';

import LeaveTable from './leavetable'

import { SwipeAction,Toast } from 'antd-mobile';

import { myList,GetNew } from '../utils/api' ;
import { CashTo3,keysrt } from '../utils/typeChange';
var moment = require('moment');

const icons = require('../data/icons.json');

class  TagLeftContent extends  Component{
  static defaultProps = {
    todo:true
  }
 constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      refreshing:false,
      dataArr:[]
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }


  async _onRefresh() {
    // 将刷新标识 显示出来
    this.setState({refreshing: true});
    // 获取新数据
    try{

    let res = await fetch(GetNew,{method:'get',headers:{
								"Content-Type": "application/x-www-form-urlencoded"
		}});
    let resData = await res.text();
    let lists = JSON.parse(resData.slice(1,-1));
    // console.log(lists)
    // let arr = this.state.dataSource;
    const todosNum = await AsyncStorage.getItem("MineDataSourceArr");
    let todoObj = JSON.parse(todosNum);
    // console.info(todoObj);
    let arr = [];
    for(var o in todoObj){
      arr.push(todoObj[o]);
    }
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
    // console.info("2 ||"+arr.length);
    if(lists.data.length === 0){
          Toast.info('暂无新消息',1.5,null,false);
        }else{
          Toast.success('更新了'+lists.data.length+'条消息',1.5,null);
        }
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(arr),
      refreshing:false,
      dataArr:arr

    });
    }catch(e){
        Toast.fail('加载失败',1.5,null);
    }
    
    // this.fetchData().then(() => {
    //   this.setState({refreshing: false});
    // });
  }


	async fetchData(){
    let res = await fetch(myList,{method:'get',headers:{
								"Content-Type": "application/x-www-form-urlencoded"
							}})
    let resData = await res.text();
    let lists = JSON.parse(resData.slice(1,-1));
    let listArr = lists.data.sort(keysrt('date',true));
    let listObj = {};
    listArr.forEach((c,i)=>{
      listObj[i] = c;
    });
    // console.log(JSON.stringify(listObj));
    let listObjs = JSON.stringify(listObj);
    await AsyncStorage.setItem("MineDataSourceArr",listObjs);
    // console.info(lists)
    this.setState({
        dataSource:this.state.dataSource.cloneWithRows(lists.data),
        loaded:true,
        dataArr:lists.data
      });
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
  goWhere = (messes)=>{
    this.props.navigator.push({
      component:LeaveTable,
      passProps:{
        title:messes.type,
        leftTitle:'返回'
      }
    })
  };

  onDelete(value) {
    const tempArr = this.state.dataArr;
    // console.log(tempArr)
    let newArr = tempArr.filter(v => v !== value);
    // console.log(newArr);
    this.setState({
      dataArr: newArr,
      dataSource:this.state.dataSource.cloneWithRows(newArr)
    });
    // console.log(this.state.dataArr)
  }

  checkNow(msg){
    let stateMsg = msg.state;
    switch(stateMsg){
      case '已批准':
        return <Text style = {[styles.List_flag_Text1,{color:'#00CC99',borderColor:'#00CC99'}]} >{msg.state}</Text>
      case '未提交':
        return <Text style = {styles.List_flag_Text1} >{msg.state}</Text>
      case '待审核':
        return <Text style = {[styles.List_flag_Text1,{color:'#39F',borderColor:'#39F'}]} >{msg.state}</Text>
      case '已驳回':
        return <Text style = {[styles.List_flag_Text1,{color:'tomato',borderColor:'tomato'}]} >{msg.state}</Text>
    }
  }
  renderList(messes) {
    let money = messes.amount;
    let date = messes.date.substr(0,10);
    let title = messes.title.slice(0,10);
    // console.info(title)
    title = title.length>8?title + ' ...':title;
    money += '';
    money = CashTo3(money);
    money = money.length===0?'0.00':money;
    let count = messes.count;
    count = count?count:0;
  	 return (
       <SwipeAction
          autoClose={true}
          right={[
            {
              text: '驳回',
              onPress: () => this.onDelete(messes),
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
                <Image source={{uri: icons[messes.type]}}   style={ styles.List_pic }/>
                <View style={styles.rightContainer}>
                    <Text style={styles.List_Item_Text}>{messes.type}</Text>
                    <Text style = { styles.List_Brief }>{title}</Text>
                    <Text style = { styles.List_Text }>{moment(date).fromNow()}</Text>
                    {!this.props.todo && this.checkNow(messes)}
                    <Text style={ styles.List_extra }>{messes.type==='请假单'?count+'天':'￥'+money}</Text>
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
		borderWidth:1,
		paddingLeft: 4,
		paddingRight:4,
		paddingTop:1,
		borderRadius:4,
		borderColor:'#FF9900',
  },
  rightContainer: {
    flex: 1,
  },

  List_pic: {
    width:44,
    height:44 ,
    marginRight:18,
    borderRadius:22
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
        color:'#CCCCCC'
  },

  List_Text: {
  	position: 'absolute',
		top: 0,
		right:49,
		fontSize:13 ,
		color:'#CCCCCC',
  },


 })
