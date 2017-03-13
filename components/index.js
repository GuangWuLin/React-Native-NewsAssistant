import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage
} from 'react-native';

import {TabBar,Toast} from 'antd-mobile';

import Home from './home.js';
import Edit from './edit.js';
import Tables from './tables.js';
import Mine from './mine.js';

const icons = require('../data/icons');

var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

const Tabbar = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'redTab',
      hidden: true,
	  	todosNum:''
    };
  },
  componentDidMount(){
		this.getNum().done();
		// let self = this;
		RCTDeviceEventEmitter.addListener('todosNum',(num)=>{
				this.setState({
					todosNum:num
				})
		})
  },
 renderContent(pageText) {
		switch(pageText){
			case '首页':
				return <Home navigator={this.props.navigator}/>
			case '填报':
				return <Edit navigator={this.props.navigator}/>
			case '报表':
				return <Tables native={this.props.navigator}/>
			case '我的':
				return <Mine navigator={this.props.navigator}/>
		}
  },
  async getNum(){
		try{
			let todosNum = await AsyncStorage.getItem("todosNum");
			todosNum!==0 && this.setState({todosNum:todosNum});
		}catch(error){
			Toast.fail('数据获取失败！',1);
		}
  },
  
  render() {
    return (
      		<TabBar
		        unselectedTintColor="#949494"
		        tintColor="#33A3F4"
		        barTintColor="white"
		        hidden={true}
        	>
		      	<TabBar.Item
		      		icon={{uri:icons.home}}
	          		selectedIcon={{uri:icons.home_active}}
					title="首页"
					key="首页"
					badge={this.state.todosNum}
					selected={this.state.selectedTab === 'redTab'}
					onPress={() => {
							this.setState({
							selectedTab: 'redTab',
						});
	          		}}
		        >
					{/*{console.log(this.state.todosNum)}*/}
	            	{this.state.selectedTab === 'redTab' && this.renderContent('首页')}
		        </TabBar.Item>
		        <TabBar.Item
		          icon={{uri:icons.edit}}
	          	  selectedIcon={{uri:icons.edit_active}}
		          title="填报"
		          key="填报"
		          selected={this.state.selectedTab === 'blueTab'}
		          onPress={() => {
		            	this.setState({
		                selectedTab: 'blueTab',
	            	});
	          	}}
		        >
	            	{this.state.selectedTab === 'blueTab' && this.renderContent('填报')}
		        </TabBar.Item>
		       <TabBar.Item
		          icon={{uri:icons.table}}
	          	  selectedIcon={{uri:icons.table_active}}
		          title="报表"
		          key="报表"
		          selected={this.state.selectedTab === 'greenTab'}
		          onPress={() => {
		            	this.setState({
		                selectedTab: 'greenTab',
						});
					}}
		        >
		        {this.state.selectedTab === 'greenTab' &&  this.renderContent('报表')}
		        </TabBar.Item>
		        <TabBar.Item
		          icon={{uri:icons.mine}}
	          	selectedIcon={{uri:icons.mine_active}}
		          title="我的"
		          key="我的"
		          selected={this.state.selectedTab === 'yellowTab'}
		          onPress={() => {
		            	this.setState({
		                selectedTab: 'yellowTab',
	            	});
	          	}}
		        >
	            	{this.state.selectedTab === 'yellowTab' && this.renderContent('我的')}
		        </TabBar.Item>
        	</TabBar>
    );
  },
})


export { Tabbar as default };
