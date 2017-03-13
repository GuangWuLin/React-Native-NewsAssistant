import React from 'react';
    import {
        View,
        Text,
        Image,
        StyleSheet,
        ScrollView,
        Modal,
        TouchableOpacity,
    } from 'react-native';

const icons = require('../data/icons');

    export default class NavBar extends React.Component {


      constructor(props) {
        super(props);
        this.state = {
          show:false,
        };
      }

      // 加载完成
      componentDidMount(){
        //
      }

      // view卸载
      componentWillUnmount(){
        //
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
            return (
             		<View
             		style = {{
             			height:51,
             			backgroundColor:'white',
             			paddingLeft:18,
             			paddingRight:18,
             			flexDirection: 'column',
             			justifyContent: 'center',
             			alignItems: 'center',
             			borderBottomWidth:1,
             			borderColor:'#eeeeee',
             		}}
             		>
                  <View>
                  <Text style={{fontSize:18,color:'#108EE9'}} onPress={this._rightButtonClick.bind(this)}>
                    差旅费报销
                  </Text>
                    <Image
                      source={{uri:icons.pull}}
                      style={{
                        width:16,
                        height:16,
                        position: 'absolute',
                        top: 6,
                        left:95,
                      }}
                      />
                  </View>
                  <View>
                    <Modal
                      animationType='fade'
                      transparent={true}
                      visible={this.state.show}
                      onShow={() => {}}
                      onRequestClose={() => {}} >
                      <View style={styles.modalStyle}>
                        <View style={styles.subView}>
                          <TouchableOpacity onPress={this._rightButtonClick.bind(this)}>
                            <View style={{paddingLeft:30,height:40,backgroundColor:'white',borderBottomWidth:0.5,borderColor:'#ccc',paddingTop:12,width:108}}>
                                <Image
                                  source={{uri:icons.leave_black}}
                                  style={{
                                    width:16,
                                    height:16,
                                    position: 'absolute',
                                    top: 14,
                                    left:10,
                                  }}
                                  />
                                <Text style={{fontSize:13,color:'#666'}}>请假单</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={this._rightButtonClick.bind(this)}>
                            <View style={{paddingLeft:30,height:40,backgroundColor:'white',borderBottomWidth:0.5,borderColor:'#ccc',paddingTop:12,width:108}}>
                                <Image
                                  source={{uri:icons.contract_black}}
                                  style={{
                                    width:16,
                                    height:16,
                                    position: 'absolute',
                                    top: 14,
                                    left:10,
                                  }}
                                  />
                                <Text style={{fontSize:13,color:'#666'}}>合同付款</Text>
                            </View>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={this._rightButtonClick.bind(this)}>
                            <View style={{paddingLeft:30,height:40,backgroundColor:'white',borderBottomWidth:0.5,borderColor:'#ccc',paddingTop:12,width:108}}>
                                <Image
                                  source={{uri:icons.travel_black}}
                                  style={{
                                    width:16,
                                    height:16,
                                    position: 'absolute',
                                    top: 14,
                                    left:10,
                                  }}
                                  />
                                <Text style={{fontSize:13,color:'#666'}}>差旅费报销</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </Modal>
                  </View>


           		</View>
            );
        }
    }


const styles = StyleSheet.create({
    modalStyle: {
      marginTop:-340,
      alignItems: 'center',
      justifyContent:'center',
      flex:1,
    },
    // modal上子View的样式
    subView:{
      marginLeft:180,
      marginRight:60,
      backgroundColor:'white',
      alignSelf: 'stretch',
      alignItems: 'center',
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor:'#ccc',
      height:125,
      width:108,
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
});
