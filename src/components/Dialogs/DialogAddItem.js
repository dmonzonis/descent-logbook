import React, { useState } from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import TextInput from "../TextInput";

const DialogAddItem = (props) => {
    const [itemName, setItemName] = useState("");

    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onClose}>
                <Dialog.Title>Add new {props.type}</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label="Name"
                        defaultValue={itemName}
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

DialogAddItem.propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    onAdd: PropTypes.func,
    onClose: PropTypes.func,
};

export default DialogAddItem;
