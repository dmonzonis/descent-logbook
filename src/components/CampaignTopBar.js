import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export default function CampaignTopBar(props) {
    return (
        <Appbar style={styles.appbar}>
            <Appbar.Action
                icon="arrow-left"
                onPress={props.onBack}
            />
        </Appbar>
    );
}

const styles = StyleSheet.create({
    appbar: {
        backgroundColor: "white",
    }
});
