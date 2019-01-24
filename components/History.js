import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchCalendarResults} from '../utils/API';
import {receiveEntries, addEntry} from '../actions';
import {timeToString, getDailyReminderValue} from '../utils/helpers';

class History extends Component {
    componentDidMount() {
        const {receiveEntries, addEntry} = this.props;
        fetchCalendarResults().then((entries) =>
            receiveEntries(entries)
        ).then(res => {
            if (!res.payload[timeToString()]) {
                addEntry({
                    [timeToString()]: getDailyReminderValue(),
                });
            }
        });
    }

    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.props.entries)}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        entries: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        receiveEntries: (entries) => {
            return dispatch(receiveEntries(entries));
        },
        addEntry: (entry) => {
            dispatch(addEntry(entry));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);