import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Dialog, Portal, Paragraph } from 'react-native-paper';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import { DARK_BLUE } from '../../colors';

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

const DialogModifyNumericValue = ({
    visible,
    name,
    currentValue,
    atomicAmount,
    keyboardType,
    onModifyValue,
    onClose,
}) => {
    const [value, setValue] = useState(0);
    const [text, setText] = useState('');
    const [isValidValue, setIsValidvalue] = useState(true);

    const checkIsValidValue = (val) => currentValue + val >= 0;

    const setValueWithCheck = (newText) => {
        setText(newText);
        const intValue = parseInt(newText, 10);
        if (Number.isNaN(intValue) || !checkIsValidValue(intValue)) {
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

    const cleanUpAndClose = () => {
        setValue(0);
        setText('0');
        onClose();
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={cleanUpAndClose}>
                <Dialog.Title>Modify {name}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>
                        Insert a positive number to add {name}, or a negative number to remove {name}.
                    </Paragraph>

                    <View style={styles.row}>
                        <Button
                            mode="contained"
                            style={styles.modifierButton}
                            color={DARK_BLUE}
                            onPress={() => updateValue(-atomicAmount)}
                        >
                            -{atomicAmount}
                        </Button>
                        <TextInput
                            label={name}
                            value={isValidValue ? value.toString() : text}
                            defaultValue="0"
                            keyboardType={keyboardType}
                            style={styles.input}
                            onChangeText={setValueWithCheck}
                        />
                        <Button
                            mode="contained"
                            style={styles.modifierButton}
                            color={DARK_BLUE}
                            onPress={() => updateValue(atomicAmount)}
                        >
                            +{atomicAmount}
                        </Button>
                    </View>

                    <View style={styles.row}>
                        <Text>{currentValue}</Text>
                        <Text style={value < 0 ? styles.textRed : styles.textGreen}>
                            {` ${value < 0 ? '-' : '+'} ${Math.abs(value)}`}
                        </Text>
                        <Text>
                            {' '}
                            = {currentValue + value} {name}
                        </Text>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="black" onPress={cleanUpAndClose}>
                        Cancel
                    </Button>
                    <Button
                        color="black"
                        disabled={!isValidValue}
                        onPress={() => {
                            onModifyValue(value);
                            cleanUpAndClose();
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

DialogModifyNumericValue.defaultProps = {
    visible: false,
    currentValue: 0,
    atomicAmount: 1,
    name: undefined,
    keyboardType: 'default',
    onClose: undefined,
    onModifyValue: undefined,
};

export default DialogModifyNumericValue;
