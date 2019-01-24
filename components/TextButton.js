import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {
    purple,
} from '../utils/colors';


export default function TextButton ({onPress, children, style = {}}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.button, style]}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        color: purple
    }
});