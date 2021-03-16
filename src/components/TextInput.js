import React from 'react';
import { TextInput as TextInputPaper } from 'react-native-paper';
import PropTypes from 'prop-types';
import { DARK_BLUE } from '../colors';

const TextInput = (props) => {
    return (
        <TextInputPaper
            label={props.label}
            defaultValue={props.defaultValue}
            value={props.value}
            style={props.style}
            dense={props.dense || false}
            selectionColor={DARK_BLUE}
            underlineColor={DARK_BLUE}
            onChangeText={props.onChangeText}
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

export default TextInput;
