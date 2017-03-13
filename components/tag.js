import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import { SegmentedControl, SearchBar } from 'antd-mobile';

import TagLeftContent from './tagleftcontent.js';

import TagRightContent from './tagrightcontent.js';

export default class Tag extends Component{
	constructor(props) {
		super(props);
		this.state = {
			a:true
		};
	}
	onValueChange = (value)=>{
		if(value === '待办事宜'){
			this.setState({a:true});
		}else  if(value === '我的单据'){
			this.setState({a:false});
		}
	};
	hehe(){
		if(this.state.a){
			return <TagLeftContent navigator={this.props.navigator} />
		}else{
			return <TagRightContent todo={this.state.a} navigator={this.props.navigator}/>
		}
	}
	render() {
		return (
			<View>
				<SearchBar placeholder="搜索"/>
				<SegmentedControl
					style={{marginTop:12, marginBottom:12,marginLeft:18,marginRight:18}}
					values={['待办事宜', '我的单据',]}
					onValueChange={this.onValueChange}
				/>
				{this.hehe()}
			</View>
		)
	}
}
