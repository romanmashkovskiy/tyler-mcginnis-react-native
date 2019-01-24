import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchCalendarResults} from '../utils/API';
import {receiveEntries, addEntry} from '../actions';
import {timeToString, getDailyReminderValue} from '../utils/helpers';
import UdacifitnessCalendar from 'udacifitness-calendar';

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

    renderItem = ({today, ...metrics}, formattedDate, key) => {
        return (
            <View>
                {today
                    ? <Text>{JSON.stringify(today)}</Text>
                    : <Text>{JSON.stringify(metrics)}</Text>}
            </View>
        );
    };

    renderEmptyDate = (formattedDate) => {
        return (
          <View>
              <Text>No data for this day</Text>
          </View>
        );
    };

    render() {
        const {entries} = this.props;
        return (
            <UdacifitnessCalendar
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
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