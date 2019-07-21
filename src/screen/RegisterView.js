import React,{Component} from 'react';
import {Text,View,Dimensions,StyleSheet,Image,TextInput,KeyboardAvoidingView,ActivityIndicator} from 'react-native';
import {TabView,SceneMap,TabBar} from 'react-native-tab-view';
import { Input,Button } from 'react-native-elements';

import firebaseSvc from '../firebase/config';
import firebase from 'firebase';
navigator.geolocation = require('@react-native-community/geolocation');
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { withNavigation } from 'react-navigation';




class RegisterView extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            uid:'',
            email: '',
            FullName:'',
            password:'',
            image:'',
            latitude:0.1,
            longitude:0.1,
            loading:false

          };
    }
      

      HandleCurrentPositon () {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
    .then(data => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
         //  console.warn(position);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          
        },
        (error) => this.setState({ error: error.message ,loading:false}),
        { enableHighAccuracy: false, timeout: 100000, maximumAge:   100 },
      );
    }).catch(err => {
        alert('get location failed!')
    });
      
    }
    componentDidMount= async() => {
      await this.HandleCurrentPositon();
    }

      handleSignUp = async () => {

        try {
          const user = {
            FullName: this.state.FullName,
            email: this.state.email,
            password: this.state.password,
            latitude:this.state.latitude, 
            longitude:this.state.longitude,
            image:this.state.image != '' ? this.state.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSHaUmHR39A7WXq4xA3yMMwcfmgIcJlKDw63UQM8AFjUKG8Tw2'
          };
          // alert('account created!')
           await this.setState({loading:true})
          await firebaseSvc.createAccount(user);
         
        } catch ({ message }) {
          alert('create account failed. catch error:' + message);
        }
      }
    

    render(){

        return(
         
            <View style={[styles.scene],{ flex:1,paddingTop:15, marginRight:25,marginLeft:25}}>
          
            <View style={{flexDirection:'column',justifyContent:'flex-start'}}>
            
            <Text style={[styles.HeaderTextWelcome],{fontSize:22, fontWeight:'500'}}>
                Sign Up, 
                </Text>
            <Text style={[styles.HeaderTextWelcome],{fontSize:17, fontWeight:'500',paddingLeft:30}}>
            and let's get started
            </Text>
            </View>
            {this.state.loading===true ? <ActivityIndicator size='large' /> :
            <View style={{flexDirection:'column',paddingTop:10,justifyContent:'center'}}>
            
                <TextInput
                style={styles.TextInput}
                placeholder='Email'
                value={this.state.email}
                onChangeText={(text)=> this.setState({email:text})}
                />
                <TextInput
                style={styles.TextInput}
                placeholder='Full Name'
                onChangeText={(text)=> this.setState({FullName:text})}
                />
                <TextInput
                style={styles.TextInput}
                placeholder='Image url'
                onChangeText={(text)=> this.setState({image:text})}
                />
                <TextInput
                style={styles.TextInput}
                placeholder='Password'
                secureTextEntry={true}
                onChangeText={(text)=> this.setState({password:text})}
                />
                <Button
                title='Create account'
                buttonStyle={{backgroundColor:'#326E93'}}
              //   onPress={()=> this.handleSubmit(({
              //       Email:this.state.Email,
              //  FullName:this.state.FullName,
              //  Password:this.state.Password
              //   }))}
              onPress={this.handleSignUp}
                />
                
            </View>}
            
            
            </View>
            

        )
    }
}

export default withNavigation(RegisterView);

const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    TextInput:{
      fontSize:16,
      paddingVertical:15
    }
  });