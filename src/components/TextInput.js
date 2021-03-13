import React from 'react';
import { TextInput as TextInputPaper } from 'react-native-paper';
import { DARK_BLUE } from "../colors";

export default function TextInput(props) {
    return (
        <TextInputPaper
            label={props.label}
            value={props.value}
            style={props.style}
            dense={props.dense || false}
            selectionColor={DARK_BLUE}
            underlineColor={DARK_BLUE}
            onChangeText={props.onChangeText}
        />
    );
}
