import React,{Component} from 'react';
import {Text,View,Dimensions,StyleSheet,Image,ActivityIndicator,Animated,TouchableOpacity} from 'react-native';
import {TabView,SceneMap,TabBar} from 'react-native-tab-view';
import { Input,Button } from 'react-native-elements';
import MapView,{PROVIDER_GOOGLE, AnimatedRegion,Callout} from 'react-native-maps';
import { mapStyle } from '../components/mapStyle';
navigator.geolocation = require('@react-native-community/geolocation');
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { withNavigation } from 'react-navigation';
import UserListFooter from '../components/UserListFooter';
import firebaseSvc,{dbs} from '../firebase/config';
import firebase from 'firebase';
import Modal from "react-native-modal";


const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

class MapsView extends Component {
    constructor(props){
        super(props);
        this.state={
             latitude:-7.758359, 
             longitude: 110.378174,
             error:null,
             loading:true,
             marginBottom:1,
             users:[],
             isModalVisible: false
            
          };
        }
    
    static navigationOptions = {
      header : null
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };



getAllUser(){
    let users = dbs.ref('/users');
    // users.once('value').then(data => {
    //     this.setState({ users: data.val() })
    //   })
    users
       .on('value', (data) => {
                this.setState({ users: data.val() })
               
           })
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
          error: null,
          loading:false,
          //flex
        });
        
      },
      (error) => this.setState({ error: error.message ,loading:false}),
      { enableHighAccuracy: false, timeout: 100000, maximumAge:   100 },
    );
  }).catch(err => {
      this.props.navigation.navigate('Login');
  });
    
  }
    
   componentDidMount () {
    this.HandleCurrentPositon();
    this.subs=[
      this.props.navigation.addListener('willFocus', ()=> {
          this.getAllUser();
          console.warn('listener')
      })
 
  ]
 
   }

   componentWillUnmount(){
  
    this.subs.forEach(sub => {
        sub.remove()
    })
}

      

       handleLogout = async () => {
          await firebase.auth().signOut();
       }
       
       _onMapReady = () => this.setState({marginBottom: 0})

       modalLink(nav,marker){
        return(
          <Modal isVisible={this.state.isModalVisible}
                      hasBackdrop={true}
                      backdropOpacity={0.01}
                      onBackButtonPress={this.toggleModal}
                      onBackdropPress={this.toggleModal}
                      style={{justifyContent:'center',alignSelf:'center'}}
                      >
          <View style={{ borderRadius:15,width:'50%',height:'35%',backgroundColor:'#FFF',justifyContent:'center',alignSelf:'center'}}>
            <View
            style={{flexDirection:'row',marginLeft:5}}
            >
            <Image
            source={{uri:marker.image}}
            style={{height:90,width:90,alignSelf:'center'}}
            />
            <Text
            style={{paddingLeft:5,alignSelf:'center',marginLeft:4
          ,fontSize:18,fontWeight:'bold'
          }}
            >{marker.FullName}</Text>
            </View>
            <View
            style={{flexDirection:'row',marginTop:5}}
            >
              {marker.uid !==firebaseSvc.uid && 
            <Button
            buttonStyle={{width:100,alignSelf:'center',marginLeft:6,marginRight:5,backgroundColor:'#39A22E'}}
            title='Chat' onPress={()=> this.props.navigation.navigate(nav,marker)} />
              }
            <Button
            title='Profile'
            containerStyle={{width:'70%'}}
            buttonStyle={{width:100}}
            onPress={()=> this.props.navigation.navigate(nav,marker)}
            />
            </View>
            <Button
            type='outline'
            containerStyle={{width:'20%',alignSelf:'center',paddingTop:8,borderRadius:50}}
            buttonStyle={{width:50,borderRadius:50,backgroundColor:'transparent'}}
            titleStyle={{color:'#000'}}
            rounded={true}
            title='X' onPress={this.toggleModal} />
          </View>
        </Modal>
        )
    }

    render(){
      const users = Object.keys(this.state.users).map((key) => {
        this.state.users[key].uid = key;
        return this.state.users[key];
        });
          //console.warn(users)
         //console.warn(this.state.users)
      //  console.warn(this.state.longitude)
      let region ={
        latitude:  this.state.latitude,
        longitude:this.state.longitude ,
        latitudeDelta:0.05,
        longitudeDelta:0.05
      }
        return (
          <View style={{flex:1,justifyContent:'center',marginBottom:this.state.marginBottom}}>
          {/* {this.state.longitude == 0.1 ?  <Text style={{alignSelf:'center',fontSize:28}}>Loading</Text> : */}
          {this.state.longitude !== 0.1 &&
            <View style={{flex:1}}>
             
              <View style={{width:'100%',backgroundColor:'transparent'}}>
              <Button
              
              buttonStyle={{width:'20%'}}
              title='Logout'
              
              onPress={this.handleLogout}
              />
              </View>
              
              
              
              <View
              style={{width:'100%',height:'100%'}}>
                
             <MapView
             onMapReady={this._onMapReady}
             customMapStyle={mapStyle}
             showsUserLocation={true}
             showsMyLocationButton={true}
             loadingEnabled={true}
             followsUserLocation={true}
             
             //showsUserLocation={true}
             
              //ref = {(ref)=>this.mapView=ref}
             //onRegionChange={() => this.mapView.root.animateToRegion(({-7.758359,-7.758359,0.1,0.1, 2000);}
             style={{width:'100%',height:'100%'}}
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    initialRegion={region}
                >
                    {users.map((marker, index) => {
                      let coordinate ={
                        latitude:marker.latitude,
                        longitude:marker.longitude
                      }
                  return (
                    <MapView.Marker key={index} coordinate={coordinate}
                    title={marker.FullName}
                    description={marker.FullName}
                    //onPress={()=> this.toggleModal()}
                    onPress={()=> marker.uid == firebaseSvc.uid ? this.props.navigation.navigate('Profile',marker) : this.props.navigation.navigate('Chat',marker)}
                    >
                      {this.modalLink('Chat',marker)}
                      <Animated.View style={[styles.markerWrap]}>
                        <Animated.View style={[styles.ring]} />
                        <View style={styles.marker} />
                      </Animated.View>
                      
                      <Image
                    source={{uri:marker.image}}
                    style={{height:50,width:50,borderRadius:50}}
                    />
                    
                    </MapView.Marker>
                  );
                })}

            
                </MapView>
               
                </View>
                <View style={{flex:1,height:'20%'}}>
                <UserListFooter
                users={{users}}/>
                
                </View>
              
  </View> 
          }
        </View>
        )
    }

}

export default withNavigation(MapsView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(130,4,150, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(130,4,150, 0.3)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(130,4,150, 0.5)",
  },
});
