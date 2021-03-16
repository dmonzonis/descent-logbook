import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    appbar: {
        backgroundColor: 'white',
    },
});

const CampaignTopBar = ({ onBack }) => {
    return (
        <Appbar style={styles.appbar}>
            <Appbar.Action icon="arrow-left" onPress={onBack} />
        </Appbar>
    );
};

CampaignTopBar.propTypes = {
    onBack: PropTypes.func,
};

CampaignTopBar.defaultProps = {
    onBack: undefined,
};

export default CampaignTopBar;
