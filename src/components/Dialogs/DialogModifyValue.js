import React, { useState } from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import TextInput from "../TextInput";

export default function DialogModifyValue(props) {
    const [value, setValue] = useState("");

    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onClose}>
                <Dialog.Title>Modify {props.name}</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label={props.name}
                        defaultValue={value}
                        onChangeText={text => setValue(text)}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="black" onPress={props.onClose}>Cancel</Button>
                    <Button
                        color="black"
                        disabled={value === ""}
                        onPress={() => {
                            props.onModifyValue(value);
                            setValue("");
                            props.onClose();
                        }}>
                        Accept
                        </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
