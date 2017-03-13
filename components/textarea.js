import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import { List, TextareaItem ,WingBlank ,WhiteSpace} from 'antd-mobile';
import { createForm } from 'rc-form';

let Textarea = React.createClass({
  render() {
    const { getFieldProps } = this.props.form;
    return (
    	<View style={{backgroundColor:'white' ,marginTop:6,}}>
	    		<Text style={{marginTop:6,marginBottom:6,paddingLeft:14,paddingRight:14,fontSize:16,color:'#999999', }}>请假理由</Text>
	    	  <TextareaItem
	    	    style={{fontSize:14, height:44,color:'#999999',}}
	    	    placeholder='请输入请假理由...'
		        rows={4}
	        	count={400}
		      />
    	</View>
      );
  },
});

Textarea = createForm()(Textarea);

export { Textarea as default };
