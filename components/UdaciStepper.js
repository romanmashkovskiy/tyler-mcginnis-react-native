import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet,
} from 'react-native';
import {FontAwesome, Entypo} from '@expo/vector-icons';
import {
    purple,
    gray,
    white,
} from '../utils/colors';

export default function UdaciSteper({value, onIncrement, onDecrement, unit}) {
    return (
        <View style={styles.container}>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={onDecrement}
                    style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
                >
                    {Platform.OS === 'ios' ?
                        (<Entypo
                            name='minus'
                            color={purple}
                            size={30}
                        />)
                        :
                        (<FontAwesome
                            name='minus'
                            color={white}
                            size={30}
                        />)}

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onIncrement}
                    style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}
                >
                    {Platform.OS === 'ios' ?
                        <Entypo
                            name='plus'
                            color={purple}
                            size={30}
                        />
                        :
                        <FontAwesome
                            name='plus'
                            color={white}
                            size={30}
                        />}
                </TouchableOpacity>
            </View>
            <View style={styles.metricInfo}>
                <Text style={{fontSize: 30}}>{value}</Text>
                <Text style={{fontSize: 20, color: gray}}>{unit}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metricInfo: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iosBtn: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: gray,
        width: 80,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    androidBtn: {
        borderRadius: 2,
        backgroundColor: purple,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
});