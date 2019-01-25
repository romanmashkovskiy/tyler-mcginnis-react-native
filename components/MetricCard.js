import React from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import {getMetricMetaInfo} from '../utils/helpers';
import DateHeader from './DateHeader';
import {gray} from '../utils/colors';

const MetricCard = ({date, metrics}) => {
    return (
        <View>
            {date && <DateHeader date={date}/>}
            {Object.keys(metrics).map((metric) => {
                const {getIcon, displayName, unit} = getMetricMetaInfo(metric);
                return (
                    <View style={styles.metric} key={metric}>
                        {getIcon()}
                        <View>
                            <Text style={{fontSize: 22}}>{displayName}</Text>
                            <Text style={{color: gray}}>{`${metrics[metric]} ${unit}`}</Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    metric: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
});

export default MetricCard;