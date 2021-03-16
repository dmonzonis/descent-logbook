import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import DialogModifyNumericValue from './Dialogs/DialogModifyNumericValue';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignContent: 'stretch',
        alignItems: 'center',
        margin: 10,
    },
    goldText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
});

const GoldIndicator = ({ gold, onModifyGold }) => {
    const [modifyGoldDialogVisible, setModifyGoldDialogVisible] = useState(false);

    return (
        <View>
            <DialogModifyNumericValue
                name="Gold"
                visible={modifyGoldDialogVisible}
                currentValue={gold}
                atomicAmount={25}
                onClose={() => setModifyGoldDialogVisible(false)}
                onModifyValue={onModifyGold}
            />

            <View style={styles.root}>
                <Text style={styles.goldText}>Gold: {gold}</Text>
                <IconButton icon="pencil" size={16} color="black" onPress={() => setModifyGoldDialogVisible(true)} />
            </View>
        </View>
    );
};

GoldIndicator.propTypes = {
    gold: PropTypes.number,
    onModifyGold: PropTypes.func,
};

GoldIndicator.defaultProps = {
    gold: 0,
    onModifyGold: undefined,
};

export default GoldIndicator;
