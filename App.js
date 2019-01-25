import React from 'react';
import {View, Platform} from 'react-native';
import AddEntry from './components/AddEntry';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {entries as reducer} from './reducers/index';
import History from './components/History';
import {
    createMaterialTopTabNavigator,
    createAppContainer,
} from 'react-navigation';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {white, purple, gray} from './utils/colors';

const Tabs = createAppContainer(createMaterialTopTabNavigator({
    History: {
        screen: History,
        navigationOptions: {
            title: 'history',
            tabBarIcon: ({tintColor}) =>
                <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>,
        },
    },
    AddEntry: {
        screen: AddEntry,
        navigationOptions: {
            title: 'add entry',
            tabBarIcon: ({tintColor}) =>
                <FontAwesome name='plus-square' size={30} color={tintColor}/>,
        },
    },
}, {
    initialRouteName: 'History',
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        inactiveTintColor: gray,
        style: {
            height: 60,
            backgroundColor: Platform.OS === 'ios' ? white : purple,
        },
        showIcon: true,
    },
}));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <View style={{height: 30}}/>
                    <Tabs/>
                </View>
            </Provider>
        );
    }
}
