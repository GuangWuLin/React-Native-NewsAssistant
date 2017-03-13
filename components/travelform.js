import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  AsyncStorage,
  RefreshControl,

} from 'react-native';

import { Picker,DatePicker, List, WhiteSpace ,TextareaItem, InputItem ,WingBlank ,Button ,Toast,SwipeAction} from 'antd-mobile';

import { createForm } from 'rc-form';

import TravelDateSelect from './traveldateselect.js';

import ImagePicker from './imagepicker.js';

import NavBarList from './navbarlist.js';

import { AK } from '../utils/api';

const icons = require('../data/icons');

const regions = require('../data/regions');

class City {
    constructor(id, title) {
        this.value = id;
        this.label = title;
        this.parent = null;
        this.children = new Array();
    }
}

 const zones = (function(){
      // 根据id从小到大进行排序
      regions.sort(function(a, b){
          return a.id - b.id;// FIXME
      });
      var all = new Array();
      regions.forEach(function(c){
          // 循环遍历数组
          var _pid = c.pid;
          var city = new City(c.id,c.name);
          all.forEach(function(m){// 循环遍历已创建的City对象，查找当前创建的City对象的上级是否存在，存在的话，做关联
              if (m.value == _pid) {// 存在父级，则做关联
                  city.parent = m;
                  m.children.push(city);
                  return;
              }
          });

          all.push(city);
      });
      return all[0];
      //all.clear();
  })();

// 如果不是使用 List.Item 作为 children
let a = 0;
let b = 0;
let c = 0;
let addkinds = '';
let addrows = '';
let startcitys = '';
let endcitys = '';

const StartCity = React.createClass({
  getInitialState() {
    return {
      data: [],
      cols: 3,
      pickerValue: [],
      area:{},
      zone:[]
    };
  },

  componentWillMount(){
    let transObj = zones.children;
    const zoneArr = new Array();
    for(let o in transObj){
      zoneArr.push(transObj[o]);
    }
    this.setState({
      zone:zoneArr
    })
  },

  componentDidMount(){
    this.getAddress();
  },
  async getAddress(){
    let datas = await AsyncStorage.getItem('address');
    let area = JSON.parse(datas);
    console.info(area);
    this.setState({
      area:area.result.addressComponent
    })
  },
  render() {
    let zone = this.state.area;
    let zones = this.state.zone;
    // console.info(zone)
      return(
        <Picker
           data={zones}
           cols={2}
           title="选择地区"
           extra={<Text style={{color:'#999',fontSize:17,}}>{zone.province+','+zone.city}</Text>}
           value={this.state.pickerValue}
           onChange={(v) => this.setState({ pickerValue: v })}
         >
         <List.Item  style={{position:'relative',left:-135,width:250,}}></List.Item>
         </Picker>
      );
    },
});

const EndCity = React.createClass({
    getInitialState() {
      return {
        data: [],
        cols: 2,
        pickerValue: [],
        zone:[]
      };
    },
     componentWillMount(){
      const transObj = zones.children;
      const zoneArr = new Array();
      for(let o in transObj){
        zoneArr.push(transObj[o]);
      }
      this.setState({
        zone:zoneArr
      })
    },

    render() {
      const zones = this.state.zone;
      return(
        <Picker
           data={zones}
           cols={2}
           extra={<Text style={{color:'#999999',fontSize:17,}}>请选择地点</Text>}
           value={this.state.pickerValue}
           onChange={(v) => this.setState({ pickerValue: v })}
         >
         <List.Item  style={{position:'relative',left:-110,width:250,}}></List.Item>
         </Picker>

      );
    },
});

const AddKinds = React.createClass({
  getInitialState() {
    return {
      addkind:[

      ],
    };
  },
  onDelete(){
        if(this.state.addkind.length>1){
          c--;
          let addKinds = this.state.addkind;
          addKinds.pop();
          this.setState({addkind: addkinds});
        }
      },
    render() {
      return(
        <SwipeAction
             style={{ backgroundColor: 'gray' }}
             autoClose
             right={[
               {
                 text: '取消',
                 onPress: () => console.log('取消'),
                 style: { backgroundColor: '#ddd', color: 'white' },
               },
               {
                 text: '删除',
                 onPress: () => this.onDelete(),
                 style: { backgroundColor: '#F4333C', color: 'white' },
               },
             ]}
             onOpen={() => console.log('global open')}
             onClose={() => console.log('global close')}
           >
           <View style={{ backgroundColor:'white',height:44,flex:1,flexDirection: 'row',justifyContent: 'center', alignItems: 'center',paddingLeft:18,paddingRight:18}}>
            <Text style={{ color:'#666',fontSize:14 ,flex:1}}>添加款项</Text>
              <TouchableOpacity>
              <Image
                source={{uri:icons.edit2}}
                style={{
                  width:28,
                  height:28,
                  flexDirection: 'row',
                }}
              />
            </TouchableOpacity>
              <InputItem
               style={{flex:3}}
               type="password"
               placeholder="￥0.00"
             ></InputItem>
           </View>
           </SwipeAction>
      );
    },
});

const AddRow = React.createClass({
  getInitialState() {
    return {
      startcity:[
      	 <StartCity key={'start'}/>
      ],
      endcity:[
      	 <EndCity key={'end'}/>
      ],
      addkind:[

      ],
    };
  },

  addkinds_add(){
  c++;
  this.state.addkind.push(
    <AddKinds key={c.toString()}/>
  );
  this.setState({addkind: addkinds});
  },

  toggle_city(){
    this.setState({startcity: endcitys});
    this.setState({endcity: startcitys});
  },

	render(){
    startcitys = this.state.startcity;
    endcitys = this.state.endcity;
    addkinds = this.state.addkind;
		return (
				<View style={{marginTop:12}}>
		       <TravelDateSelect />
		       <View
		       style={{
					    justifyContent: 'center',
					    alignItems: 'center',
					    backgroundColor:'white',
					    height:28,
		       }}
		       >
           <TouchableOpacity onPress={this.toggle_city}>
              <Image
                source={{uri:icons.goto}}
                style={{
                  width:28,
                  height:28,
                }}
                />
            </TouchableOpacity>
		       </View>
            <View
              style={{
                flex:1,
                flexDirection: 'row',
                backgroundColor:'white',
                height:30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={{ flex: 1,}}>
                    {startcitys}
              </View>

              <View style={{flex: 1,}}>
                  {endcitys}
              </View>
              <Image source={{uri:icons.right}} style={{position:'relative',right:18,top:0,width:16,height:16}}/>
            </View>

             {addkinds}

               <SwipeAction
                    style={{ backgroundColor: 'gray' }}
                    autoClose
                    right={[
                      {
                        text: '取消',
                        onPress: () => console.log('取消'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                      },
                      {
                        text: '删除',
                        onPress: () => console.log('删除'),
                        style: { backgroundColor: '#F4333C', color: 'white' },
                      },
                    ]}
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                  >
                  <View style={{ backgroundColor:'white',height:44,flex:1,flexDirection: 'row',justifyContent: 'center', alignItems: 'center',paddingLeft:18,paddingRight:18}}>
                   <Text style={{ color:'#666',fontSize:14 ,flex:1}}>添加款项</Text>
                      <TouchableOpacity onPress={this.addkinds_add}>
                     <Image
                       source={{uri:icons.edit2}}
                       style={{
                         width:28,
                         height:28,
                         flexDirection: 'row',
                       }}
                     />
                   </TouchableOpacity>
                     <InputItem
                      style={{flex:3}}
                      type="password"
                      placeholder="￥0.00"
                    ></InputItem>
                  </View>
                  </SwipeAction>
              </View>
		);
	},

});

const Row = React.createClass({
  getInitialState() {
    return {
      data: [],
      cols: 1,
      pickerValue: [],
      addrow:[
         <AddRow  key={a.toString()}/>
      ],
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      zone:[]
    }
  },
    opress_add(){
      a++;
			this.state.addrow.push(
        <AddRow key={a.toString()}/>
      );
      this.setState({addrow: addrows});
  },

  opress_del(){
    if(this.state.addrow.length>1){
      a--;
      this.state.addrow.pop(
        <AddRow key={a.toString()}/>
      );
      this.setState({addrow: addrows});
    }
  },
  componentWillMount(){
    // let trans = trans();
    let transObj = zones.children;
    const zoneArr = new Array();
    for(let o in transObj){
      zoneArr.push(transObj[o]);
    }
    this.setState({
      zone:zoneArr
    })
  },
  componentDidMount(){
    this.getAddress();
  },
  async getAddress(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // var initialPosition = JSON.stringify(position);
        // console.log(position);
        let url = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${position.coords.latitude},${position.coords.longitude}&output=json&pois=1&ak=cT1wg5cn2VH5ewOhUazREGUsEMo2NB9T`;
        fetch(url)
        .then(res=>res.text())
        .then(data=>{
          // console.info('1008611  '+data);
            let newData = data.slice(29,-1);
            AsyncStorage.setItem('address',newData);
            // console.log(newData)
        })
        // this.setState({initialPosition});
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.state.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  },

  _onClick: function() {
   this.props.onClick(this.props.data);
 },

  render() {
    addrows = this.state.addrow;
    let zone = this.state.zone;
    // const areas = zones.children;
    // console.info(zones);
    // console.info(zone)
    return (
          <View>
              <View style={styles.List_Item} >
                <Text style={styles.List_Item_Text}>￥15,000,000.00</Text>
              </View>

             <List style={{ backgroundColor: 'white' , marginTop:6,}}>

             <Picker
                ref='ss'
                data={zone}
                title="选择地区"
                extra={<Text  style={styles.picker_extra}>请选择事由</Text>}
                value={this.state.pickerValue}
                onChange={(v) => this.setState({ pickerValue: v })}
              >
              <List.Item arrow="horizontal"><Text style={styles.picker_text}>出差事由</Text></List.Item>
              </Picker>
               <Picker
                data={zone}
                title="选择地区"
                extra={<Text  style={styles.picker_extra}>请选择项目</Text>}
                value={this.state.pickerValue}
                onChange={(v) => this.setState({ pickerValue: v })}
              >
              <List.Item arrow="horizontal"><Text  style={styles.picker_text}>出差项目</Text></List.Item>
              </Picker>
             </List>

             {addrows}

             <View style={{ height:44, paddingRight:18, paddingLeft:18, backgroundColor:'white',flexDirection: 'row',justifyContent: 'center', alignItems: 'center',}} >
                <TouchableOpacity onPress={this.opress_add} style={{flex:1}}>
                <Image
                  source={{uri:icons.newadd}}
                  style={{
                    width:28,
                    height:28,
                  }}
                />
                </TouchableOpacity>
                <Text
                  style={{
                    color:'#666',
                    fontSize:14 ,
                    flex:9,
                  }}
                  >添加行程</Text>
                  <TouchableOpacity onPress={this.opress_del}>
                  <Image
                    source={{uri:icons.close}}
                    style={{
                      width:16,
                      height:16,
                    }}
                    />
                   </TouchableOpacity>

             </View>
            <View style={{backgroundColor:'white' ,marginTop:12, paddingBottom:12}}>
              <Text style={{marginTop:6,marginBottom:6,paddingLeft:14,paddingRight:14,fontSize:16,color:'#999999', }}>备注</Text>
              <TextareaItem
                style={{fontSize:14, height:44,color:'#999999',}}
                placeholder='这家伙很懒，什么都没留下...'
                rows={4}
                count={400}
              />
            </View>
          <ImagePicker/>
      </View>
    );
  },
});



const TravelForm = React.createClass({
  getInitialState() {
    return {
      isRefreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(1)).map(
       (val, i) => ({text: 'Initial row ' + i, clicks: 0})),
  };
},


_onRefresh() {
   this.setState({isRefreshing: true});
   setTimeout(() => {
     const rowData = Array.from(new Array(0))
     .map((val, i) => ({
       text: 'Loaded row ' + (+this.state.loaded + i),
       clicks: 0,
     }))
     .concat(this.state.rowData);

     this.setState({
       loaded: this.state.loaded + 10,
       isRefreshing: false,
       rowData: rowData,
     });
   }, 1000);
 },


_onClick(row) {
   row.clicks++;
   this.setState({
     rowData: this.state.rowData,
   });
 },

  render() {
    // console.log(this);
    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick}/>;
    });
    return (
	      	<View style={{backgroundColor:'#eee',flex:1}}>
			      	<NavBarList leftTitle={this.props.leftTitle} title={this.props.title} goBack={()=>this.props.navigator.pop()}/>
              <ScrollView
                refreshControl={
                         <RefreshControl
                           refreshing={this.state.isRefreshing}
                           onRefresh={this._onRefresh}
                           tintColor="#108EE9"
                           title="Loading..."
                           titleColor="#108EE9"
                           colors={['white', 'white', 'white']}
                           progressBackgroundColor="#108EE9"
                         />
                       }>
                {rows}
            <Button type="primary" style={{marginTop:12,marginBottom:12}} onClick={()=>alert('click here')}>提交</Button>
            </ScrollView>
	     </View>
	);
  },
});

TravelForm = createForm()(TravelForm);

export { TravelForm as default };

const styles = StyleSheet.create({
	List_Item: {
    marginTop:12,
    marginBottom:6,
		height:44,
    paddingBottom:6,
		paddingLeft:18,
		paddingRight:18,
    backgroundColor:'white'
  },


  List_Item_Text: {
		fontSize:28 ,
		color:'#333333'
  },


  picker_text:{
  	fontSize:16,
	  color:'#656565',
  },

   picker_extra:{
  	fontSize:16,
	  color:'#333333',
  },

  picker_extra1:{
  	fontSize:14,
	  color:'#666666',
  },

   picker_text1:{
  	position: 'absolute',
		top: 0,
		left:18,
  	fontSize:12 ,
		color:'#666666',
		paddingTop:6,
  },


 })
