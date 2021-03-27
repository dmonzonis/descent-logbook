import React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import i18n from '../../i18n/i18n';

const DialogDeleteItem = ({ visible, type, itemName, onClose, onDelete }) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose}>
                <Dialog.Title>
                    {i18n.t('delete')} {type === 'item' ? i18n.t('item').toLowerCase() : i18n.t('skill').toLowerCase()}
                </Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{i18n.t('deleteBody', { name: itemName })}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color="black" onPress={onClose}>
                        {i18n.t('cancel')}
                    </Button>
                    <Button
                        color="red"
                        onPress={() => {
                            onDelete();
                            onClose();
                        }}
                    >
                        {i18n.t('delete')}
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
