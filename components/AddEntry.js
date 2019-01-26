import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
} from 'react-native';
import {
    getMetricMetaInfo,
    timeToString,
    getDailyReminderValue,
} from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import {Ionicons} from '@expo/vector-icons';
import TextButton from './TextButton';
import {submitEntry, removeEntry} from '../utils/API';
import {connect} from 'react-redux';
import {addEntry} from '../actions/index';
import {
    purple,
    white,
} from '../utils/colors';
import {NavigationActions} from 'react-navigation';

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={Platform.OS === 'ios'
                ? styles.submitIos
                : styles.submitAndroid}
        >
            <Text style={styles.submitText}>
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
            [key]: entry,
        });

        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0,
        }));

        submitEntry(entry, key);

        this.toHome();
    };

    reset = () => {
        const key = timeToString();

        this.props.addEntry({
            [key]: getDailyReminderValue(),
        });

        removeEntry(key);

        this.toHome();
    };

    toHome = () => {
        // this.props.navigation.goBack('AddEntry'); //analog
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddEntry',
        }));
    };

    render() {
        const metaInfo = getMetricMetaInfo();

        if (this.props.alreadyLogged) {
            return (
                <View style={styles.alreadyLogged}>
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'}
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
            <View style={styles.main}>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metaInfo).map((key) => {
                    const {getIcon, type, ...rest} = metaInfo[key];
                    const value = this.state[key];

                    return (
                        <View key={key} style={styles.metrica}>
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

const styles = StyleSheet.create({
    alreadyLogged: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 40
    },
    metrica: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    submitIos: {
        backgroundColor: purple,
        borderRadius: 6,
        height: 40,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 20
    },
    submitAndroid: {
        backgroundColor: purple,
        borderRadius: 3,
        height: 40,
        width: 150,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    submitText: {
        color: white,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const mapStateToProps = (state) => {
    const key = timeToString();
    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined',
    };

};

const mapDispatchToProps = (dispatch) => {
    return {
        addEntry: (entry) => {
            dispatch(addEntry(entry));
        },
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);
