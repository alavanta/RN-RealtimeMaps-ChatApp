import React,{Component} from 'react';
import {View,ActivityIndicator } from 'react-native';
import firebase from 'firebase';


export default class Loading extends Component {

  componentDidMount() {
    
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Maps' : 'Login')
    })
    
  }

  static navigationOptions = {
    header : null
}

  render(){
      return(
          <View
          style={{flex:1}}
          >
              <ActivityIndicator
              style={{flex:1}}
              size='large'
              />
          </View>
      )
  }
}
