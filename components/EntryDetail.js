import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import MetricCard from './MetricCard';
import TextButton from './TextButton';
import {addEntry} from '../actions/index';
import {removeEntry} from '../utils/API';
import {
    timeToString,
    getDailyReminderValue,
} from '../utils/helpers';


class EntryDetail extends Component {

    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params;

        return {
            title: entryId,
        };
    };

    shouldComponentUpdate(nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today;
    }

    reset = () => {
        const {remove, goBack, entryId} = this.props;
        remove();
        removeEntry(entryId);
        goBack();
    };

    render() {
        const {metrics} = this.props;
        return (
            <View style={styles.container}>
                <MetricCard metrics={metrics}/>
                <TextButton onPress={this.reset} style={styles.resetBtn}>
                    RESET
                </TextButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1
    },
    resetBtn: {
        alignSelf: 'center',
        marginTop: 10
    }
});

const mapStateToProps = (state, {navigation}) => {
    const {entryId} = navigation.state.params;

    return {
        entryId,
        metrics: state[entryId]
    }
};

const mapDispatchToProps = (dispatch, {navigation}) => {
    const {entryId} = navigation.state.params;

    return {
        remove: () => {
            dispatch(addEntry(
                {[key]: entryId === timeToString()
                        ? getDailyReminderValue()
                        : null}
            ))
        },
        goBack: () => navigation.goBack()
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);