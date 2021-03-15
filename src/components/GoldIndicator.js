import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import DialogModifyValue from './Dialogs/DialogModifyValue';

const GoldIndicator = (props) => {
    const [modifyGoldDialogVisible, setModifyGoldDialogVisible] = useState(false);

    return (
        <View>
            <DialogModifyValue
                name="Gold"
                visible={modifyGoldDialogVisible}
                onClose={() => setModifyGoldDialogVisible(false)}
                onModifyValue={props.onModifyGold}
            />

            <View style={styles.root}>
                <Text style={styles.goldText}>Gold: {props.gold}</Text>
                <IconButton
                    icon="pencil"
                    size={16}
                    color="black"
                    onPress={() => setModifyGoldDialogVisible(true)}
                />
            </View>
        </View>
    );
}

GoldIndicator.propTypes = {
    onModifyGold: PropTypes.func,
    gold: PropTypes.string
};

export default GoldIndicator;

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        alignContent: "stretch",
        alignItems: "center",
        margin: 10,
    },
    goldText: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    }
});
