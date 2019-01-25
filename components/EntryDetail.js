import React from 'react';
import {View, Text} from 'react-native';

export default ({navigation}) => (
    <View>
        <Text>
            Entry Detail - {navigation.state.params.entryId}
        </Text>
    </View>
);