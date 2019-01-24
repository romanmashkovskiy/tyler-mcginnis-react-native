import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import {Ionicons} from '@expo/vector-icons';
import TextButton from './TextButton';
import {submitEntry, removeEntry} from '../utils/API';
import {connect} from 'react-redux';
import {addEntry} from '../actions/index';

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <Text>
                SUBMIT
            </Text>
        </TouchableOpacity>
    );
}

class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    };

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);

        this.setState((state) => {
            const count = state[metric] + step;

            return {
                ...state,
                [metric]: count > max ? max : count,
            };
        });
    };

    decrement = (metric) => {
        const {step} = getMetricMetaInfo(metric);

        this.setState((state) => {
            const count = state[metric] - step;

            return {
                ...state,
                [metric]: count < 0 ? 0 : count,
            };
        });
    };

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value,
        }));
    };

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        this.props.addEntry({
            [key]: entry
        });

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        }));

        submitEntry(entry, key);
    };

    reset = () => {
        const key = timeToString();

        this.props.addEntry({
            [key]: getDailyReminderValue()
        });

        removeEntry(key);
    };

    render() {
        const metaInfo = getMetricMetaInfo();

        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons
                        name='md-happy'
                        size={100}
                    />
                    <Text>
                        You have already logged your information today
                    </Text>
                    <TextButton onPress={this.reset}>Reset</TextButton>
                </View>
            );
        }

        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key];
                    const value = this.state[key];

                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                                ? <UdaciSlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                />
                                : <UdaciStepper
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />}
                        </View>
                    );
                })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const key = timeToString();
    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        addEntry: (entry) => {
            dispatch(addEntry(entry))
        }
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);
