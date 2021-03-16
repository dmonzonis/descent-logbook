import React, { useState } from 'react';
import { Button, RadioButton, Dialog, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';

const DialogGiveItem = ({ visible, heros, onClose, onGiveItem }) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const buildRadioButtons = () => {
        const radioButtons = [];
        for (const player of heros) {
            radioButtons.push(
                <RadioButton.Item
                    key={player.playerChar} // Character is always unique
                    label={player.playerChar}
                    value={player.playerChar}
                />
            );
        }
        return radioButtons;
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose}>
                <Dialog.Title>Give item to</Dialog.Title>
                <Dialog.Content>
                    <RadioButton.Group onValueChange={(value) => setSelectedPlayer(value)} value={selectedPlayer}>
                        {buildRadioButtons()}
                    </RadioButton.Group>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="black" onPress={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="black"
                        disabled={selectedPlayer === null}
                        onPress={() => {
                            onGiveItem(selectedPlayer);
                            setSelectedPlayer(null);
                            onClose();
                        }}
                    >
                        Give
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

DialogGiveItem.propTypes = {
    visible: PropTypes.bool,
    heros: PropTypes.array,
    onGiveItem: PropTypes.func,
    onClose: PropTypes.func,
};

DialogGiveItem.defaultProps = {
    visible: false,
    heros: [],
    onGiveItem: undefined,
    onClose: undefined,
};

export default DialogGiveItem;
