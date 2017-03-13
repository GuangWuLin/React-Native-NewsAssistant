import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	  TouchableHighlight,
} from 'react-native';
import {Toast} from 'antd-mobile';

const icons = require('../data/icons');
    export default class NavBarList extends React.Component {
		constructor(props){
			super(props);
			this.state = {
				title:'',
				leftTitle:''
			}
		}
		componentDidMount(){
			this.setState({
				title:this.props.title,
				leftTitle:this.props.leftTitle
			})
		}
        render() {
            return (
           		<View style = {styles.container}>
					<Image source={{uri:icons.left}} style={styles.backIcon} />
					<Text style={styles.backText} onPress={()=>this.props.goBack()} >{this.props.leftTitle}</Text>
                  <Text style={{fontSize:18,color:'#108ee9'}}>{this.props.title}</Text>
                  <Text style={styles.subText} onPress={()=>Toast.success('提交成功',1)} >提交</Text>
           		</View>
            );
        }
    }
const styles = StyleSheet.create({
	container:{
		height:51,
		backgroundColor:'white',
		paddingLeft:18,
		paddingRight:18,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth:1,
		borderColor:'#eeeeee',
	},
	backIcon:{
		width:24,
		height:24,
		position: 'absolute',
		top: 13,
		left:18,
	},
	backText:{
		color:'#108EE9' ,
		fontSize:14,
		position: 'absolute',
		top: 15,
		left:40,
	},
  subText:{
		color:'#108EE9' ,
		fontSize:14,
		position: 'absolute',
		top: 15,
		right:40,
	}
})
