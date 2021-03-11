import React, { useState } from 'react';
import { Button, TextInput, Dialog, Portal } from 'react-native-paper';

export default function DialogModifyXp(props) {
    const [xp, setXp] = useState("");

    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onClose}>
                <Dialog.Title>Modify XP</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label="XP"
                        value={xp}
                        onChangeText={text => setXp(text)}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="black" onPress={props.onClose}>Cancel</Button>
                    <Button
                        color="black"
                        disabled={xp === ""}
                        onPress={() => {
                            props.onModifyXp(xp)
                            setXp("");
                            props.onClose();
                        }}>
                        Accept
                        </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
