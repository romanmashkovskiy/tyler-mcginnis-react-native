import React from 'react';
import {
    View,
    Slider,
    Text,
    StyleSheet
} from 'react-native';
import {
    gray,
} from '../utils/colors';

export default function UdaciSlider({max, unit, step, value, onChange}) {
    return (
        <View style={styles.container}>
            <Slider
                maximumValue={max}
                minimumValue={0}
                step={step}
                value={value}
                onValueChange={onChange}
                style={{flex: 1}}
            />
            <View style={styles.metricInfo}>
                <Text style={{fontSize: 30}}>{value}</Text>
                <Text style={{fontSize: 20, color: gray}}>{unit}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    metricInfo: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});