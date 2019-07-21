import React,{Component} from 'react';
import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation';

import Login from '../screen/Login';
import MapsView from '../screen/MapsView';
import Chat from '../screen/Chat';
import Loading from '../screen/Loading';
import Profile from '../screen/ProfileScreen';

const RootNavigator = createStackNavigator(
    {
        Loading:Loading,
        Login : Login,
        Maps: MapsView,
        Chat:Chat,
        Profile:Profile
    },
    {
        // initialRouteName:'Loading'
    }
    
)

export default createAppContainer(RootNavigator);