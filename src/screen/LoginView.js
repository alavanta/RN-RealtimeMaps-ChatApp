import React,{Component} from 'react';
import {Text,
    View,
    Dimensions,
    StyleSheet,
    Image,
    TextInput,
    KeyboardAvoidingView} from 'react-native';
import {TabView,SceneMap,TabBar} from 'react-native-tab-view';
import { Input,Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';


class LoginView extends Component {
    
    constructor(props){
        super(props);
        this.state = {
             email: '',
             password: '',
             errorMessage: null 
            }
    }

    
    handleLogin = () => {
      const { email, password } = this.state
      console.warn(password);
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Maps'))
        .catch(error => alert(error.message))
    }

    render(){
        return(
            
            <View style={[styles.scene],{ flex:1,paddingTop:15, marginRight:25,marginLeft:25}}>
                
            <View style={{flexDirection:'row-reverse',justifyContent:'space-between'}}>
            
            <Image
            source={{uri:'https://avatars0.githubusercontent.com/u/50483547?s=400&u=41c17ec0f75659e8b86bb4b7480802778a1c9303&v=4'}}
            style={{height:100,width:100, alignSelf:'flex-end'}}
            />
            
            <View style={{flexDirection:'column',alignContent:'flex-start'}}>
            <Text style={styles.HeaderTextWelcome,{fontSize:17}}>Welcome Back, </Text>
            <Text style={[styles.HeaderTextWelcome],{fontSize:22, fontWeight:'500',marginLeft:5}}>
                DhieoIT
            </Text>
            
            </View>
            </View>
            {/* <KeyboardAvoidingView
            style={{flex:1}}
            > */}
            <View style={{flexDirection:'column',paddingTop:10}}>
            
                <TextInput
                containerStyle={{paddingVertical:25}}
                style={styles.TextInput}
                placeholder='Email'
                value={this.state.email}
                onChangeText={(text) => this.setState({email:text})}
    
                />
                <TextInput
                containerStyle={{paddingVertical:25}}
                style={styles.TextInput}
                placeholder='Password'
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text) => this.setState({password:text})}
                
                
    
                />
                {/* </KeyboardAvoidingView> */}
                <Button
                title='Login'
                buttonStyle={{backgroundColor:'#326E93'}}
                onPress={()=> this.handleLogin()}
                
                />
            </View>
            
            </View>
            

        )
    }
}

export default withNavigation(LoginView);

const styles = StyleSheet.create({
    scene: {
      flex: 1,
    },
    HeaderTextWelcome:{
      
    },
    TextInput:{
      fontSize:16,
      paddingVertical:15
    }
  });