import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {
    storeCampaign,
    retrieveCampaign,
    retrieveSummaries,
    storeNewCampaignSummary,
    deleteCampaign
} from "../storage.js"
import Campaign from "./Campaign";
import DialogNewCampaign from "./Dialogs/DialogNewCampaign";
import DialogDeleteCampaign from './Dialogs/DialogDeleteCampaign.js';
import { DARK_BLUE } from "../colors";


export default function CampaignSelector() {
    const [loadedCampaignUid, setLoadedCampaignUid] = useState(null);
    const [loadedCampaign, setLoadedCampaign] = useState(null);
    const [summaries, setSummaries] = useState(null);
    const [areSummariesLoaded, setAreSummariesLoaded] = useState(null);
    const [createCampaignDialogVisible, setCreateCampaignDialogVisible] = useState(false);
    const [deleteCampaignDialogVisible, setDeleteCampaignDialogVisible] = useState(false);
    const [selectedCampaignSummary, setSelectedCampaignSummary] = useState(null);

    const updateCampaign = (campaignData) => {
        storeCampaign(loadedCampaignUid, campaignData);
    }

    const addNewCampaignHandler = (name, data) => {
        const uid = uuidv4();
        const summary = {
            uid,
            name,
            completed: false
        };
        deleteCampaign(uid).then(() => {
            storeNewCampaignSummary(summary);
            storeCampaign(uid, data);
        });

        const summariesUpdated = summaries || [];
        setSummaries([...summariesUpdated, summary]);
    }

    const deleteCampaignHandler = (uid) => {
        deleteCampaign(uid);
        const summariesUpdated = summaries.filter(summary => summary.uid !== uid);
        setSummaries(summariesUpdated);
        setSelectedCampaignSummary(null);
    }

    const loadCampaign = (uid) => {
        retrieveCampaign(uid).then(campaign => {
            setLoadedCampaign(campaign);
            setLoadedCampaignUid(uid);
        });
    }

    const loadingView = <View><Text>Loading...</Text></View>;

    if (!areSummariesLoaded) {
        retrieveSummaries().then(summaries => {
            setSummaries(summaries);
            setAreSummariesLoaded(true);
        });
        return loadingView;
    }

    if (!loadedCampaign) {
        return (
            <ScrollView style={styles.root}>
                <DialogNewCampaign
                    visible={createCampaignDialogVisible}
                    existingNames={summaries && summaries.map(summary => summary.name)}
                    onCreate={addNewCampaignHandler}
                    onClose={() => setCreateCampaignDialogVisible(false)}
                />
                <DialogDeleteCampaign
                    visible={deleteCampaignDialogVisible}
                    name={selectedCampaignSummary && selectedCampaignSummary.name}
                    onDelete={() => deleteCampaignHandler(selectedCampaignSummary.uid)}
                    onClose={() => setDeleteCampaignDialogVisible(false)}
                />

                <Text style={styles.title}>
                    CAMPAIGNS
                </Text>

                {summaries && summaries.map(summary => {
                    return (
                        <View key={summary.uid} style={styles.summaryRow}>
                            <Button
                                style={styles.campaignSummary}
                                color={DARK_BLUE}
                                labelStyle={styles.summaryText}
                                onPress={() => loadCampaign(summary.uid)}>
                                {summary.name}
                            </Button>
                            <IconButton
                                icon="delete"
                                color="red"
                                size={18}
                                onPress={() => {
                                    setSelectedCampaignSummary(summary);
                                    setDeleteCampaignDialogVisible(true);
                                }}
                            />
                        </View>
                    );
                })}
                <Button
                    onPress={() => setCreateCampaignDialogVisible(true)}
                    color={DARK_BLUE}
                >
                    Add new campaign
                    </Button>
            </ScrollView>
        );
    }

    return (
        <Campaign
            campaign={loadedCampaign}
            updateCampaign={updateCampaign}
            onBack={() => setLoadedCampaign(null)}
        />
    );
}

const styles = StyleSheet.create({
    root: {
        padding: 5,
    },
    campaignSummary: {
        borderColor: "black",
        borderRadius: 5,
        borderWidth: 2,
        marginVertical: 10,
        flex: 1
    },
    summaryRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    summaryText: {
        color: "black"
    },
    title: {
        marginVertical: 10,
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 24,
    }
});
