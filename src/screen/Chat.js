import React,{Component} from 'react';
import { View,
    SafeAreaView,Text,StyleSheet,TouchableOpacity ,TextInput,FlatList,Dimensions,KeyboardAvoidingView,Image} from 'react-native';
import { Input,Button } from 'react-native-elements';
import {GiftedChat} from 'react-native-gifted-chat';
import { withNavigation } from 'react-navigation';
import firebaseSvc,{dbs} from '../firebase/config';
import firebase from 'firebase';
import DateFormat from 'dateformat';



const deviceHeight = Dimensions.get('window').height;

class Chat extends Component{

    constructor(props){
        super(props);
        this.state={
            messages:[],
            profile: {
                FullName: props.navigation.getParam('FullName'),
                email: props.navigation.getParam('email'),
            },
            textMessage:''

        }
        console.warn('chat uid '+this.props.navigation.state.params.uid)
        // console.warn('chat uid '+this.props.navigation.state.params.image)
    }

     static navigationOptions = ({navigation}) => {
        const { params } = navigation.state;
        console.warn(params.image)
        return {
            title : params.FullName || 'Chat',
            headerTitleStyle: {
                flexGrow:1,
                alignSelf:'center',
                fontSize:14,
                marginLeft:20
            },
            headerRight:(
                <TouchableOpacity
                onPress={() => navigation.navigate('Profile',params)}
                >
                <Image
                source={{uri:params.image}}
                style={{marginRight:25,height:50,width:50,borderRadius:50}}
                />
                </TouchableOpacity>
                    )
                
                
            }
        }
    

    
              renderChat = ({item}) => {
                  return(
                <View
                style={{flexDirection:'row',
                    width:'60%',
                    alignSelf: item.sender === firebaseSvc.uid ? 'flex-end' : 'flex-start',
                    backgroundColor:item.sender === firebaseSvc.uid ? '#DCF8C6' :'#F4F4F2',
                    borderRadius:5,
                    marginBottom:10
                }}>
                    <Text
                    style={{
                        color:'#000',
                        padding:7,fontSize:16
                    }}>
                        {item.message}
                    </Text>

                    <Text
                    style={{
                        color:'#000',
                        padding:3,fontSize:12
                    }}>
                        {DateFormat(item.time,"H:ss")}
                    </Text>
                </View>
                  
                  )
              } 
        handleChange = key => val => {
            this.setState({
                [key] :val
            })
        }

        
        

        sendMessage = async () => {
            if(this.state.textMessage.length > 0) {
                let senderUid = firebaseSvc.uid;
                let receiverUid = this.props.navigation.state.params.uid 
                let path        = senderUid + receiverUid
                let revPath     = receiverUid + senderUid
                
                //await  console.warn(fromUid)
                  let msgId = firebaseSvc.ref.child(path).push().key
                  
                  let updates = {};
                  let message ={ 
                      message: this.state.textMessage,
                      time:firebaseSvc.timestamp,
                      sender: senderUid,
                      receiver: receiverUid

                   }
                    updates['Messages/'+path+'/'+senderUid+'/'+msgId] = message
                    updates['Messages/'+revPath+'/'+receiverUid+'/'+msgId] = message
                      firebase.database().ref().update(updates);
                      this.setState({ textMessage: '' })
                  }
            }

        

    render(){
        // console.warn(this.state.messages)
        return (
            <SafeAreaView
            style={{backgroundColor:'#CED7DE'}}
            >
                 
                <FlatList
                style={{padding:10,height:deviceHeight * 0.8}}
                data={this.state.messages}
                renderItem={this.renderChat}
                keyExtractor={(item,index) => index.toString()}
                />
               
                <View
                style={{flexDirection:'row',alignItems:'center',width:'100%'}}>

                
                <TextInput
                
                style={styles.input}
                value={this.state.textMessage}
                onChangeText={this.handleChange('textMessage')}
                placeholder='Type message... '
                />
                <TouchableOpacity
                onPress={this.sendMessage}>
                   <Image
                   source={{uri:'http://www.iconarchive.com/download/i99076/benzlee/free-christmas/paper-airplane.ico'}}
                   style={{width:45,height:45,backgroundColor:'#7781FF',borderRadius:10,marginBottom:10}}
                   />
                </TouchableOpacity>
                </View>
                
            </SafeAreaView>
            
        )
    }    

   
       

    componentWillMount() { 
        //this.props.navigation
        let senderUid = firebaseSvc.uid;
        let receiverUid = this.props.navigation.state.params.uid 
        let path        = senderUid + receiverUid
        console.warn(path+'/'+senderUid)
       dbs.ref('Messages').child(path).child(senderUid)
       .on('child_added', (value) => {
           this.setState((prevState)=>{
               return {
                   messages: [...prevState.messages, value.val()]
               }
           })
       })
       
      }

      componentWillUnmount() {

      }

}

export default withNavigation(Chat);

const styles = StyleSheet.create({
    btnText:{
        color:'darkblue',
        fontSize:20,
        

    },
    input:{
        padding:10,
        borderWidth:1,
        borderColor:'#CCC',
        width:'80%',
        marginBottom:15,
        marginLeft:15,
        marginRight:5,
        borderRadius:5,
        backgroundColor:'#FFF'
        
    }
})
