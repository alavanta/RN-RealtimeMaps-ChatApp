import React,{Component} from 'react';
import {View,Text,Image,StyleSheet,FlatList} from 'react-native';
import { withNavigation } from 'react-navigation';
import {Card} from 'react-native-elements'


const detail =[
    {
        id:1,
        FullName:'Dhieo Deva Alavanta',
        email:'alavanta.deva@gmail.com',
        status:'Online'
        
    }
]

class ProfileScreen extends Component {

    constructor(props){
        super(props);
        this.state={
            // details:this.props.navigation.navigate.params.params
            details:this.props.navigation.state.params
        }
        // console.warn(this.props.navigation.state.params)
    }

    


        
    

    render(){
        //console.warn(this.state.details[0].email)
        return(
            <View
            style={{flex:1,margin:20}}
            >
                {/* <Text
                style={{fontSize:22,alignSelf:'center',paddingVertical:10}}
                >Profile Details</Text> */}
               
            <Image
            source={{uri:this.state.details.image}}
            style={{width:120,height:120,borderRadius:50,alignSelf:'center'}}
            />
            <Text
            style={{alignSelf:'center',paddingTop:20,fontSize:18,fontWeight:'bold'}}
            >
                {this.state.details.FullName}
            </Text>
            <View
            style={{flex:1,flexDirection:'column'}}
            >
                
            <View
            style={{flexDirection:'row',justifyContent:'space-between',paddingTop:30}}
            >
                <Text
                style={styles.infoTitle}
                >Email :</Text>
                <Text
                style={styles.infoValue}
                >{this.state.details.email}</Text>
                 
            </View>
            <View
            style={{flexDirection:'row',justifyContent:'space-between',paddingTop:30}}
            >
               
                  <Text
                style={styles.infoTitle}
                >Name :</Text>
                <Text
                style={styles.infoValue}
                >{this.state.details.FullName}</Text>
            </View>


            </View>

            </View>

        )
    }
}

export default withNavigation(ProfileScreen);

const styles = StyleSheet.create({
    infoTitle:{
        fontSize:18,
        fontWeight:'bold',
        color:'#403C39'
    },
    infoValue:{
        fontSize:18,
        color:'#403C39' 
    }
})