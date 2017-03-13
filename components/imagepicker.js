import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';


import { ImagePicker, Button } from 'antd-mobile';

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

const ImagePickerExample = React.createClass({
  getInitialState() {
    return { files: data, custom: false };
  },
  onChange(files, type, index) {
    console.log(files, type, index);
    this.setState({
      files,
    });
  },
  onAddImageClick() {
    this.setState({
      files: this.state.files.concat({
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '3',
      }),
    });
  },
  sw() {
    this.setState({
      custom: !this.state.custom,
    });
  },
  render() {
    const { files, custom } = this.state;
    return (<View
    	style={{marginBottom:6,paddingLeft:18,paddingRight:18, backgroundColor:'white' }}
    >

      {custom ? <ImagePicker
        files={files}
        onChange={this.onChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        onAddImageClick={this.onAddImageClick}
        selectable={files.length < 5}
      /> : <ImagePicker
        files={files}
        onChange={this.onChange}
        onImageClick={(index, fs) => console.log(index, fs)}
        selectable={files.length < 5}
      />}
    </View>);
  },
});

export { ImagePickerExample as default };
