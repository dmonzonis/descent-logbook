import React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';

const DialogDeleteCampaign = ({ visible, name, onClose, onDelete }) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose}>
                <Dialog.Title>Delete campaign</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>Permanently delete campaign {name}?</Paragraph>
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

DialogDeleteCampaign.propTypes = {
    visible: PropTypes.bool,
    name: PropTypes.string,
    onClose: PropTypes.func,
    onDelete: PropTypes.func,
};

DialogDeleteCampaign.defaultProps = {
    visible: false,
    name: 'campaign',
    onClose: undefined,
    onDelete: undefined,
};

export default DialogDeleteCampaign;
