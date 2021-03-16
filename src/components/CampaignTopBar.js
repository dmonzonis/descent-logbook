import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import PropTypes from 'prop-types';

const CampaignTopBar = (props) => {
    return (
        <Appbar style={styles.appbar}>
            <Appbar.Action icon="arrow-left" onPress={props.onBack} />
        </Appbar>
    );
};

CampaignTopBar.propTypes = {
    onBack: PropTypes.func,
};

const styles = StyleSheet.create({
    appbar: {
        backgroundColor: 'white',
    },
});

export default CampaignTopBar;
