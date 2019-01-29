import React from 'react';
import {
    View,
    Platform,
    StatusBar,
} from 'react-native';
import AddEntry from './components/AddEntry';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {entries as reducer} from './reducers/index';
import History from './components/History';
import {
    createMaterialTopTabNavigator,
    createAppContainer,
    createStackNavigator,
} from 'react-navigation';
import {
    FontAwesome,
    Ionicons,
} from '@expo/vector-icons';
import {
    white,
    purple,
    gray,
} from './utils/colors';
import {Constants} from 'expo';
import EntryDetail from './components/EntryDetail';
import Live from './components/Live';

const Tabs = createMaterialTopTabNavigator({
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
    Live: {
        screen: Live,
        navigationOptions: {
            title: 'live',
            tabBarIcon: ({tintColor}) =>
                <Ionicons name='ios-speedometer' size={30} color={tintColor}/>,
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
});

const MainNavigator = createAppContainer(createStackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },
    EntryDetail: {
        screen: EntryDetail,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: purple
            }
        }
    }
}));

const StatusBarCustom = ({backgroundColor, ...rest}) => (
    <View style={{height: Constants.statusBarHeight, backgroundColor}}>
        <StatusBar translucent backgroundColor={backgroundColor} {...rest}/>
    </View>
);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <StatusBarCustom backgroundColor={purple}
                                     barStyle={'light-content'}/>
                    <MainNavigator/>
                </View>
            </Provider>
        );
    }
}
