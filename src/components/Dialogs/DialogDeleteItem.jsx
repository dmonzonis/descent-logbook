import React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';

const DialogDeleteItem = ({ visible, type, itemName, onClose, onDelete }) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose}>
                <Dialog.Title>Delete {type}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Are you sure you want to delete {itemName}?</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="black" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="red"
                        onPress={() => {
                            onDelete();
                            onClose();
                        }}
                    >
                        DELETE
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

DialogDeleteItem.propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.string,
    itemName: PropTypes.string,
    onDelete: PropTypes.func,
    onClose: PropTypes.func,
};

DialogDeleteItem.defaultProps = {
    visible: false,
    type: 'item',
    itemName: undefined,
    onDelete: undefined,
    onClose: undefined,
};

export default DialogDeleteItem;
