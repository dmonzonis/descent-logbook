import React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import i18n from '../../i18n/i18n';

const DialogDeleteCampaign = ({ visible, name, onClose, onDelete }) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onClose}>
                <Dialog.Title>{i18n.t('deleteCampaign')}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{i18n.t('deleteCampaignBody', { campaign: name })}</Paragraph>
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
