import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchCalendarResults} from '../utils/API';
import {receiveEntries, addEntry} from '../actions';
import {timeToString, getDailyReminderValue} from '../utils/helpers';
import UdacifitnessCalendar from 'udacifitness-calendar';
import DateHeader from './DateHeader';
import {white} from '../utils/colors';
import MetricCard from './MetricCard';
import {AppLoading} from 'expo';

class History extends Component {
    state = {
        isLoading: true,
    };

    componentDidMount() {
        const {receiveEntries, addEntry} = this.props;
        fetchCalendarResults().then((entries) => {
            return receiveEntries(entries);
        }).then(res => {
            if (!res.payload[timeToString()]) {
                addEntry({
                    [timeToString()]: getDailyReminderValue(),
                });
            }
        }).then(() => {this.setState(() => ({isLoading: false}))});
    }

    renderItem = ({today, ...metrics}, formattedDate, key) => {
        return (
            <View style={styles.item}>
                {today
                    ?
                    <View>
                        <DateHeader date={formattedDate}/>
                        <Text style={styles.text}>{today}</Text>
                    </View>
                    :
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate(
                            'EntryDetail',
                            {entryId: key});
                    }}
                    >
                        <MetricCard date={formattedDate} metrics={metrics}/>
                    </TouchableOpacity>}
            </View>
        );
    };

    renderEmptyDate = (formattedDate) => {
        return (
            <View style={styles.item}>
                <DateHeader date={formattedDate}/>
                <Text style={styles.text}>No data for this day</Text>
            </View>
        );
    };

    render() {
        const {entries} = this.props;
        const {isLoading} = this.state;

        if (isLoading) {
            return (
                <AppLoading/>
            );
        }

        return (
            <UdacifitnessCalendar
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
            />
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 12 : 3,
        paddingVertical: 10,
        paddingHorizontal: 10,
        margin: 10,
    },
    text: {
        fontSize: 20,
        marginVertical: 10,
    },
});

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