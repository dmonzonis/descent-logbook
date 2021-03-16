import React, { useState } from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';

const DialogAddItem = ({ visible, type, onClose, onAdd }) => {
    const [itemName, setItemName] = useState('');

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose}>
                <Dialog.Title>Add new {type}</Dialog.Title>
                <Dialog.Content>
                    <TextInput label="Name" defaultValue={itemName} onChangeText={(text) => setItemName(text)} />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="black" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="black"
                        disabled={itemName === ''}
                        onPress={() => {
                            onAdd(itemName);
                            setItemName('');
                            onClose();
                        }}
                    >
                        Add
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

DialogAddItem.propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    onAdd: PropTypes.func,
    onClose: PropTypes.func,
};

DialogAddItem.defaultProps = {
    visible: false,
    type: 'item',
    onAdd: undefined,
    onClose: undefined,
};

export default DialogAddItem;
