import React,{Component} from 'react';
import {Text,View,Dimensions,StyleSheet,Image,AsyncStorage} from 'react-native';
import {TabView,SceneMap,TabBar} from 'react-native-tab-view';
import { Input,Button } from 'react-native-elements';
import RegisterView from './RegisterView';
import LoginView from './LoginView';


const deviceWidth = Dimensions.get('window').width;
export const LoginRoute = () => (
    <LoginView/>
);

export const SignRoute = () => (
    
        <RegisterView/>
    
);

class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            index:0,
            routes: [
                { key: 'Login', title: 'Login' },
                { key : 'Sign', title: 'Sign Up' }
            ],
            username:'',
            password:'',
        }
    }
    
    static navigationOptions = {
        header : null
    }

    

    render(){
        return (
            <View style={{flex:1}}>
            <View style={{height:100,justifyContent:'center',backgroundColor:'#326E93'}}>
                <Image
                source={{uri:'data:image/jpeg;base64,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2a2L3dfo9I2v50eD90b7c9Ds1sXu6/R6Rtfzo8H7o3y56HZrYudXX6PSNr+dHg/dG+XPQ7NbF7uv0ekbX86PB+6N9ueh2a2L3dfo9I2v50eD90b5c9Ds1sXu6/R6Rtfzo8E/5Rvlz0OzWxe7r9HpG1/OjwfujfLnodmti93X6PSLr+dHg/dG+XPRezWxe7r9HpG1/OjwT/lG+XPROzWxe7r9HpG1/OjwfujfLnodmti93X6PSNr+dHg/dG+XPRezWxe7r9HpG1/OjwT/AJRvlz0Ts1sXu6/R6Rdfzo8H7o3y56HZrYvd1+j0ja/nR4J/yjfLnodmti93X6PSNr+dHgn/ACjfLnodmti93X6R6Rtfzo8H7o324vZrYvd1+nyU8z7eSDJBkgyQZIMkYMkYMkYMkYMkGSDKYwZRGDJiMGSMGSMGSMGUwZRBkjBkjBkgyRgymDKIMkYMkYMmIMphCAgICAgICAgMQEBAQEBAQEBAQEBAQEBAQEBAQECYCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3um91u6YNdHOOsG7b3W7pjEmujnHWDdt7rd0xiTXRzjqbpvdbumDXRzjrBum91u6YNdHOOsG6b3W7pg10c46m7b3W7pjEmujnHU3be63dMYNdHOOsI3be63dMYk10c46p3be63dMYk10c46wbtvdbumMSa6OcdYN23ut3THE10c46m7b3W7pjBro5x1N23ut3TBro5x1Rum91u6Y4mujnHVO7b3W7pjEmujnHWDdt7rd0wa6OcdTdt7rd0xiTXRzjqbpvdbumDXRzjqbtvdbumOJro5x1g3be63dMGujnHWDdt7rd0wa6OcdUbtvdbumMGujnHVO7b3W7pg10c46m6b3W7pg10c46m7b3W7pjEmujnHU3Te63dMYk10c46m7b3W7pjEmujnHU3be63dMYk10c46w/T57H4sgICVEmRXMCZREBASBKJEISKQhAQBiBEKmVCFBCBgRAGSFJRMBASIiFf/9k='}}
                style={{width:50,height:50,alignSelf:'center',borderRadius:50}}
                />
            </View>
            <TabView
            renderTabBar={props =>
                <TabBar
                  {...props}
                  indicatorStyle={{ backgroundColor: '#326E93',height:5}}
                  labelStyle={{color:'#2D2D2D'}}
                  style={{ backgroundColor: 'white' }}
                />}
            navigationState={this.state}
            renderScene={SceneMap({
                Login: LoginRoute,
                Sign: SignRoute,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
            />
            </View>
        )
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    HeaderTextWelcome:{
      
    }
  });