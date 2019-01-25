import React, {Component} from 'react';
import {View, Text} from 'react-native';

class EntryDetail extends Component {

    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params;

        return {
            title: entryId,
        };
    };

    render() {
        return (
            <View>
                <Text>
                    Entry Detail - {this.props.navigation.state.params.entryId}
                </Text>
            </View>
        );
    }
}

export default EntryDetail;