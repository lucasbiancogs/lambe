import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'

import Feed from './screens/Feed'
import AddPhoto from './screens/AddPhoto'
import Profile from './screens/Profile'
import Login from './screens/Login'
import Register from './screens/Register'
import Splash from './screens/Splash'

const authRouter = createStackNavigator({
    Login: { screen: Login, navigationOptions: { title: 'Login' } },
    Register: { screen: Register, navigationOptions: { title: 'Register' } }
}, {
    initialRouteName: 'Login'
})

const profileRoutes = {
    Auth: {
        name: 'Auth',
        screen: authRouter
    },
    Profile: {
        name: 'Profile',
        screen: Profile
    }
}

const loginOrProfileRouter = createSwitchNavigator(profileRoutes, {
    initialRouteName: 'Auth'
})

const menuRoutes = {
    Feed: {
        name: 'Feed',
        screen: props => <Feed {...props} />,
        navigationOptions: {
            title: 'Feed',
            tabBarIcon: ({ tintColor }) => 
                <Icon name={'home'} size={30} color={tintColor} />
        }
    },
    Add: {
        name: 'AddPhoto',
        screen: props => <AddPhoto {...props} />,
        navigationOptions: {
            title: 'Add Photo',
            tabBarIcon: ({ tintColor }) => 
                <Icon name={'camera'} size={30} color={tintColor} />
        }
    },
    Profile: {
        name: 'Profile',
        screen: loginOrProfileRouter,
        navigationOptions: {
            title: 'Profile',
            tabBarIcon: ({ tintColor: color }) => 
                <Icon name={'user'} size={30} color={color} />
        }
    }
}

const menuConfig = {
    initialRouteName: 'Feed',
    tabBarOptions: {
        showLabel:  false
    }
}

const menuNavigator = createBottomTabNavigator(menuRoutes, menuConfig)

const SplashRouter = createSwitchNavigator({
    Splash: {
        name: 'Splash',
        screen: Splash
    },
    App: {
        name: 'App',
        screen: menuNavigator
    }
})

export default createAppContainer(SplashRouter)