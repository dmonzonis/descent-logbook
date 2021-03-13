import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
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
import { DARK_BLUE } from "../colors";


export default function CampaignSelector() {
    const [loadedCampaignUid, setLoadedCampaignUid] = useState(null);
    const [loadedCampaign, setLoadedCampaign] = useState(null);
    const [summaries, setSummaries] = useState(null);
    const [areSummariesLoaded, setAreSummariesLoaded] = useState(null);
    const [createCampaignModalVisible, setCreateCampaignModalVisible] = useState(false);

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
                    visible={createCampaignModalVisible}
                    existingNames={summaries && summaries.map(summary => summary.name)}
                    onCreate={addNewCampaignHandler}
                    onClose={() => setCreateCampaignModalVisible(false)}
                />

                <Text style={styles.title}>
                    CAMPAIGNS
                </Text>

                {summaries && summaries.map(summary => {
                    return (
                        <Button
                            key={summary.uid}
                            style={styles.campaignSummary}
                            color={DARK_BLUE}
                            labelStyle={styles.summaryText}
                            onPress={() => loadCampaign(summary.uid)}>
                            {summary.name}
                        </Button>
                    );
                })}
                <Button
                onPress={() => setCreateCampaignModalVisible(true)}
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
