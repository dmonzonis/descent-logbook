import React, { useState } from 'react';
import { Button, RadioButton, Dialog, Portal } from 'react-native-paper';

export default function DialogGiveItem(props) {
    const [selectedPlayer, setSelectedPlayer] = useState(-1);

    const buildRadioButtons = () => {
        const radioButtons = [];
        for (const hero of props.heros) {
            radioButtons.push(<RadioButton.Item
                key={hero.heroChar}  // Character is always unique
                label={hero.heroName}
                value={hero.heroChar}
            />);
        }
        return radioButtons;
    }

    return (
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onClose}>
                <Dialog.Title>Give item to</Dialog.Title>
                <Dialog.Content>
                    <RadioButton.Group onValueChange={value => setSelectedPlayer(value)} value={selectedPlayer}>
                        {buildRadioButtons()}
                    </RadioButton.Group>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="black" onPress={props.onClose}>Cancel</Button>
                    <Button color="black" disabled={selectedPlayer === -1}>Give</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}
