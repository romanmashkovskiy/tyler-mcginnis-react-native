import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import MetricCard from './MetricCard';

class EntryDetail extends Component {

    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params;

        return {
            title: entryId,
        };
    };

    render() {
        const {metrics} = this.props;
        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics}/>
                <Text>
                    Entry Detail - {this.props.navigation.state.params.entryId}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    }
});

const mapStateToProps = (state, {navigation}) => {
    const {entryId} = navigation.state.params;
    console.log(state[entryId]);

    return {
        metrics: state[entryId]
    }
};

export default connect(mapStateToProps)(EntryDetail);