import React from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	  TouchableHighlight,
} from 'react-native';
const icons = require('../data/icons');
    export default class NavBar extends React.Component {
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
		width:20,
		height:20,
		position: 'absolute',
		top: 15,
		left:8,
		zIndex:2
	},
	backText:{
		color:'#108EE9' ,
		fontSize:14,
		position: 'absolute',
		textAlign:'center',
		lineHeight:35,
		width:80,
		height:60,
		top: 0,
		left:0,
		textShadowColor :'#dcdcdc'
	}
})