import React,{Component} from 'react';
import {View,Text,FlatList,ScrollView,TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import {user} from '../Assets/dummy';
import { withNavigation } from 'react-navigation';
import firebaseSvc,{dbs} from '../firebase/config';




class UserListFooter extends Component{

    constructor(props){
        super(props);
        this.state={
            users:props.users
        }
        console.warn(props.users)
    }

    componentDidMount(){
        this.subs=[
            this.props.navigation.addListener('willFocus', ()=> {
                // this.getAllUser();
                this.setState({
                    users:this.props.users
                })
                //console.warn(this.props.users)
            })
       
        ]
    }

    componentWillUnmount(){
        this.subs.forEach(sub => {
            sub.remove()
        })
    }

    getAllUser(){
        let users = dbs.ref('/users');
        users.once('value').then(data => {
            this.setState({ users: data.val() })
          })
          
    }

    renderItem = ({index,item}) => {
        // console.warn(item)
        return(
            <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('Chat',{uid:item.uid,
                FullName:item.FullName,
                email:item.email})}
            >
            <Card
            //containerStyle={{back}}
            imageStyle={{
                height: 100,
                width: 100,
                alignItems: 'center',
                borderRadius: 100
            }}
            title={item.FullName}
            
             image={{uri:'https://banner2.kisspng.com/20180319/pde/kisspng-computer-icons-icon-design-avatar-flat-face-icon-5ab06e33bee962.122118601521511987782.jpg'}}
            />
            </TouchableOpacity>
            
        )

    }

    render(){
       // const users = new Array() ;
    //    const users = Object.keys(this.state.users).map((key) => {
    //     this.state.users[key].id = key;
    //     return this.state.users[key];
    //     });

        // console.warn(users)
        
        // const filtered  = users.filter(user => user.uid !== firebaseSvc.uid)
       // users.filter(user => console.warn(user.uid))
        // console.warn(users);
        return(
            <View
            style={{ flex:1, zIndex: 1,
                position: 'absolute',
                bottom: 10,
                left: 10,
                right: 10,
                backgroundColor: 'transparent'}}>
                <FlatList
                style={{alignSelf:'center'}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                //data={filtered}
                data={this.state.users}
                renderItem={this.renderItem}
                />
            </View>

        )
    }
}

export default withNavigation(UserListFooter);