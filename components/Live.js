import React, {Component} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import {purple, white} from '../utils/colors';
import TextButton from "./TextButton";

class Live extends Component {
    state = {
        coords: null,
        status: 'denied',
        direction: ''
    };

    askPermission = () => {

    };

    render() {
        const {coords, status, direction} = this.state;

        if (status === null) {
            return (
                <ActivityIndicator style={{marginTop: 30}}/>
            );
        }

        if (status === 'denied') {
            return (
                <View style={styles.center}>
                    <Entypo name='warning' size={50}/>
                    <Text>You denied your location. Please visit your settings to fix this.</Text>
                </View>
            );
        }

        if (status === 'undetermined') {
            return (
                <View style={styles.center}>
                    <Entypo name='warning' size={50}/>
                    <Text>You need to enable location services for this app</Text>
                    <TouchableOpacity style={styles.button} onPress={this.askPermission}>
                        <Text style={styles.buttonText}>Enable</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View>
                <Text>Live</Text>
                <Text>{JSON.stringify(this.state)}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: purple,
        borderRadius: 4,
        padding: 10,
        margin: 20,
    },
    buttonText: {
        color: white,
    }
});

export default Live;