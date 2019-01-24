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
        const {addEntry, dispatch} = this.props;
        fetchCalendarResults().
            then((entries) => dispatch(receiveEntries(entries))).
            then(({entries}) => {
                if (!entries[timeToString()]) {
                    dispatch(addEntry({
                        [timeToString()]: getDailyReminderValue(),
                    }));
                }
            });
    }

    render() {
        return (
            <View>
                <Text>{JSON.stringify(this.props)}</Text>
            </View>
        );
    }
}

const mapStateToProps = (entries) => {
    return {
        entries,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        receiveEntries: (entries) => {
            dispatch(receiveEntries(entries));
        },
        addEntry: (entry) => {
            dispatch(addEntry(entry));
        },
    };
};

export default connect(mapStateToProps, null)(History);