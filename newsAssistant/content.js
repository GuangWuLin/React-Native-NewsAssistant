import React, {
  Component,
} from 'react';

import {
  Image,
  ListView,
  StyleSheet,
  Text,
  Alert,
  View,
  ToastAndroid,
  Linking,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

import { getAll,GetNew } from './api.js';
import { CashTo3,outputdollars,outputcents,DataFromOut,keysrt } from './util.js';
// var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';
  let num= 0


class Loding extends Component {

  constructor(props) {
    super(props);
    this.state = {// 初始设为显示加载动画
      animating: true,
    };
  }

  render() {
    return (
      <View style={styles.lodingContainer}>
      {/* 大号的指示器 */}
        <Text style={styles.text}> 
          Datas have been Loading,please wait amoument~
        </Text>
        <ActivityIndicator
          animating={this.state.animating}
          style={[styles.centering, {height: 80}]}
          size="large" />
      </View>
    );
  }
}




export default class ContentComponent extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,});
    this.state = {
      dataSource: ds,
      loaded: false,
      user:this.props.userCount,
      passwd:this.props.userPassWord,
      data:[]
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    // this.fetchData = this.fetchData.bind(this); 
    this.getAllData = this.getAllData.bind(this);
    this.getNewData = this.getNewData.bind(this);
  }
  // 异步的网络数据请求 一般放在 componentDidMount 这个组件里面
  componentDidMount() {
    // setInterval(this.getAllData,10000);
    this.getAllData();
    // this.timer = setInterval(this.getAllData,5000);
    this.getNewData()
    Linking.addEventListener('url', this._handleOpenURL);
  }
  componentWillUnmount(){
    this.timer && clearInterval(this.timer)
  }
  // 异步全部数据请求
  async  getAllData(){
      let res = await fetch(getAll,{method:'post',headers:{
								"Content-Type": "application/x-www-form-urlencoded"
							},body: "user="+this.state.user+"&passwd="+this.state.passwd});
      let content = await res.text();
      // console.info(content)
      let datas = JSON.parse(content.slice(1,-1));
      datas.data = datas.data;
      // Alert.alert(typeof datas.data)
      let totalAmount = 0;
      datas.data.forEach(c=>{
        totalAmount += c.amount;
      });
      totalAmount += '';
      totalAmount = CashTo3(totalAmount);
      this.setState({
         data:datas.data.sort(keysrt('date',true)),
         loaded:true,
         sums:datas.data.length,
         totalAmount:totalAmount
      })
    }
    // 异步更新数据请求
    async  getNewData(){
      let res = await fetch(GetNew,{method:'post',headers:{
								"Content-Type": "application/x-www-form-urlencoded"
							},body: "user="+this.state.user+"&passwd="+this.state.passwd});
      let content = await res.text();
      // console.info(content)
      let datas = JSON.parse(content.slice(1,-1));
      let arr = this.state.data;
      // Alert.alert(arr.length+'');
      
      datas.data.forEach((c,i)=>{
        arr.forEach((v,j)=>{
          if(c.oper === v.oper)  arr.splice(j,1);
        });
      });
      // Alert.alert(arr.length+'');
      
      let totalAmount = 0;
      arr.forEach(c=>{
        totalAmount += c.amount;
      });
      totalAmount += '';
      totalAmount = CashTo3(totalAmount);
      this.setState({
        sums:arr.length,
        totalAmount:totalAmount,
        data:arr
      });
    }
  render() {
      if(!this.state.loaded) {
        return <Loding />;
      }
      return (
        <View>
            <View style={styles.titleStyle}>
              <Text>待办事宜:{this.state.sums!=0?this.state.sums:0}条</Text>
              <Text>总计:{this.state.totalAmount}元</Text>
            </View>
        <ListView
            dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
            renderRow={this.renderList}
            style={styles.listView}
          />
        </View>
      );
  }

   renderList(data) {
    let amount = data.amount;
    let date = data.date;
    date = date.substr(0,10);
    amount += '';
    amount = CashTo3(amount);
    return (
      <TouchableOpacity onPress={(data)=>{Linking.openURL('https://www.baidu.com').catch(err=>console.warn(error))}}>
        <View style={styles.container} >
          <View style={styles.containers}>
              <View style={styles.start}>
                  <Text>经办人：{data.creater}</Text>
                  <Text>金额：{amount}元</Text>
              </View>
              <View style={styles.end}>    
                  <Text>事由：{data.cause}</Text>
                  <Text style={{alignSelf:'flex-start'}}>日期：{date}</Text>
              </View>    
          </View>
          <Text style={{alignSelf:'flex-start'}}>项目：{data.project}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}




var styles = StyleSheet.create({
  lodingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a2938',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  text:{
    color:'white',
    fontSize:20,
    textAlign:'center'
  },
  titleStyle:{
    flexDirection:'row',
    backgroundColor:'rgba(196, 198, 228, 0.65)',
    justifyContent:'space-between'
  },
  listView: {
    paddingTop: 5,
    backgroundColor: '#F5FCFF',
  },
  container: {
    // flex: 1,
    borderRadius:5,
    borderColor:'powderblue',
    borderWidth:1,
    backgroundColor:'powderblue',
    padding:6,
    marginTop:4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containers:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  start:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  end:{
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  }
});