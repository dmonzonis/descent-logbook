import React from 'react';
import { TextInput as TextInputPaper } from 'react-native-paper';
import PropTypes from 'prop-types';
import { DARK_BLUE } from '../colors';

const TextInput = ({ label, defaultValue, value, style, dense, onChangeText }) => {
    return (
        <TextInputPaper
            label={label}
            defaultValue={defaultValue}
            value={value}
            style={style}
            dense={dense}
            selectionColor={DARK_BLUE}
            underlineColor={DARK_BLUE}
            onChangeText={onChangeText}
        />
    );
};

TextInput.propTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    style: PropTypes.object,
    dense: PropTypes.bool,
    onChangeText: PropTypes.func,
};

TextInput.defaultProps = {
    label: '',
    defaultValue: '',
    value: null,
    style: undefined,
    dense: false,
    onChangeText: undefined,
};

export default TextInput;
