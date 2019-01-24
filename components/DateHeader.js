import React from 'react';
import { Text } from 'react-native';
import {
    lightPurp,
} from '../utils/colors';

export default function DateHeader ({date}) {
    return (
        <Text style={{color: lightPurp, fontSize: 25}}>
            {date}
        </Text>
    );
}