import React, {Component} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity, StyleSheet} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import {purple, white, blue} from '../utils/colors';

class Live extends Component {
    state = {
        coords: null,
        status: 'granted',
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
            <View style={styles.container}>
                <View style={styles.directionContainer}>
                    <Text style={styles.directionHeader}>You are heading</Text>
                    <Text style={styles.direction}>North</Text>
                </View>
                <View style={styles.metricsContainer}>
                    <View style={styles.metricContainer}>
                        <Text style={styles.metricText}>Altitude</Text>
                        <Text style={styles.metricText}>200 Feet</Text>
                    </View>
                    <View style={styles.metricContainer}>
                        <Text style={styles.metricText}>Speed</Text>
                        <Text style={styles.metricText}>300 MPH</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    directionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    directionHeader: {
        fontSize: 40,
    },
    direction: {
        fontSize: 80,
        color: purple
    },
    metricsContainer: {
        backgroundColor: purple,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    metricContainer: {
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 25,
    },
    metricText: {
        color: white,
        fontSize: 30
    },
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
        fontSize: 20,
    }
});

export default Live;