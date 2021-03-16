import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import { DARK_BLUE } from '../../colors';

const DialogModifyNumericValue = (props) => {
    const [value, setValue] = useState(0);
    const [text, setText] = useState('');
    const [isValidValue, setIsValidvalue] = useState(true);

    const checkIsValidValue = (value) => props.currentValue + value >= 0;

    const setValueWithCheck = (newText) => {
        setText(newText);
        const intValue = parseInt(newText, 10);
        if (isNaN(intValue) || !checkIsValidValue(intValue)) {
            setIsValidvalue(false);
            return;
        }
        setValue(intValue);
        setIsValidvalue(true);
    };

    const updateValue = (amount) => {
        if (!isValidValue) return;
        if (checkIsValidValue(value + amount)) {
            setValue(value + amount);
        }
    };

    const onClose = () => {
        setValue(0);
        setText('0');
        props.onClose();
    };

    const getAtomicAmount = () => props.atomicAmount || 1;

    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onClose}>
                <Dialog.Title>Modify {props.name}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>
                        Insert a positive number to add {props.name}, or a negative number to remove {props.name}.
                    </Paragraph>

                    <View style={styles.row}>
                        <Button
                            mode="contained"
                            style={styles.modifierButton}
                            color={DARK_BLUE}
                            onPress={() => updateValue(-getAtomicAmount())}
                        >
                            -{getAtomicAmount()}
                        </Button>
                        <TextInput
                            label={props.name}
                            value={isValidValue ? value.toString() : text}
                            defaultValue={'0'}
                            keyboardType={props.keyboardType}
                            style={styles.input}
                            onChangeText={setValueWithCheck}
                        />
                        <Button
                            mode="contained"
                            style={styles.modifierButton}
                            color={DARK_BLUE}
                            onPress={() => updateValue(getAtomicAmount())}
                        >
                            +{getAtomicAmount()}
                        </Button>
                    </View>

                    <View style={styles.row}>
                        <Text>{props.currentValue}</Text>
                        <Text style={value < 0 ? styles.textRed : styles.textGreen}>
                            {` ${value < 0 ? '-' : '+'} ${Math.abs(value)}`}
                        </Text>
                        <Text>
                            {' '}
                            = {props.currentValue + value} {props.name}
                        </Text>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="black" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="black"
                        disabled={!isValidValue}
                        onPress={() => {
                            props.onModifyValue(value);
                            onClose();
                        }}
                    >
                        Accept
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

DialogModifyNumericValue.propTypes = {
    visible: PropTypes.bool,
    currentValue: PropTypes.number,
    atomicAmount: PropTypes.number,
    name: PropTypes.string,
    keyboardType: PropTypes.string,
    onClose: PropTypes.func,
    onModifyValue: PropTypes.func,
};

const styles = StyleSheet.create({
    input: {
        marginVertical: 10,
        flex: 1,
        height: 60,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textGreen: {
        color: 'green',
    },
    textRed: {
        color: 'red',
    },
    modifierButton: {
        height: 40,
        marginHorizontal: 5,
    },
});

export default DialogModifyNumericValue;
