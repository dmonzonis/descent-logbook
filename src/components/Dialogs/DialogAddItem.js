import React, { useState } from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import TextInput from "../TextInput";

export default function DialogAddItem(props) {
    const [itemName, setItemName] = useState("");

    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onClose}>
                <Dialog.Title>Add new {props.type}</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label="Name"
                        value={itemName}
                        onChangeText={text => setItemName(text)}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="black" onPress={props.onClose}>Cancel</Button>
                    <Button
                        color="black"
                        disabled={itemName === ""}
                        onPress={() => {
                            props.onAdd(itemName);
                            setItemName("");
                            props.onClose();
                        }}>
                        Add
                        </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
