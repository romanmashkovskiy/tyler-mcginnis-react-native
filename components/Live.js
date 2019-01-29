import React, {Component} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import {purple, white, blue} from '../utils/colors';
import {Location, Permissions} from 'expo';
import {calculateDirection} from '../utils/helpers';

class Live extends Component {
    state = {
        coords: null,
        status: null,
        direction: '',
        bounceValue: new Animated.Value(1)
    };

    componentDidMount() {
        Permissions.getAsync(Permissions.LOCATION)
            .then(({status}) => {
                if (status === 'granted') {
                    return this.setLocation();
                }
                console.log(status);
                this.setState(() => ({status}));
            })
            .catch(err => {
                console.warn('Error getting permissions', err);
                this.setState(() => ({status: 'undetermined'}));
            })
    }

    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)
            .then(({status}) => {
                if (status === 'granted') {
                    return this.setLocation();
                }
                this.setState(() => ({status}));
            })
            .catch(err => {
                console.warn('Error asking permission', err);
                this.setState(() => ({status: 'undetermined'}));
            })
    };

    setLocation = () => {
        Location.watchPositionAsync({
            accuracy: 2,
            timeInterval: 1000,
            distanceInterval: 2
        }, ({coords}) => {
            const {direction, bounceValue} = this.state;
            const newDirection = calculateDirection(coords.heading);

            if (newDirection !== direction) {
                Animated.sequence([
                    Animated.timing(bounceValue, {toValue: 1.04, duration: 300}),
                    Animated.spring(bounceValue, {toValue: 1, friction: 4})
                ]).start();
            }

            this.setState(() => ({
                coords,
                status: 'granted',
                direction: newDirection
            }))
        })
    };

    render() {
        const {coords, status, direction, bounceValue} = this.state;

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
                    <Animated.Text style={[styles.direction, {transform: [{scale: bounceValue}]}]}>{direction}</Animated.Text>
                </View>
                <View style={styles.metricsContainer}>
                    <View style={styles.metricContainer}>
                        <Text style={styles.metricText}>Altitude</Text>
                        <Text style={styles.metricText}>{coords.altitude} meters</Text>
                    </View>
                    <View style={styles.metricContainer}>
                        <Text style={styles.metricText}>Speed</Text>
                        <Text style={styles.metricText}>{coords.speed} m/s</Text>
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