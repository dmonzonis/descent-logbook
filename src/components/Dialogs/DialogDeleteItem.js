import React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

export default function DialogDeleteItem(props) {
    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onClose}>
                <Dialog.Title>Delete {props.type}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>
                        Are you sure you want to delete {props.itemName}?
                    </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="black" onPress={props.onClose}>Cancel</Button>
                    <Button
                        color="red"
                        onPress={() => {
                            props.onDelete();
                            props.onClose();
                        }}>
                        DELETE
                        </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
