import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {
    storeCampaign,
    retrieveCampaign,
    retrieveSummaries,
    storeNewCampaignSummary,
    updateCampaignSummary,
    deleteCampaign
} from "../storage.js"
import Campaign from "./Campaign";
import DialogNewCampaign from "./Dialogs/DialogNewCampaign";


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
            <View>
                <DialogNewCampaign
                    visible={createCampaignModalVisible}
                    existingNames={summaries && summaries.map(summary => summary.name)}
                    onCreate={addNewCampaignHandler}
                    onClose={() => setCreateCampaignModalVisible(false)}
                />

                {summaries && summaries.map(summary => {
                    return <Button key={summary.uid} onPress={() => loadCampaign(summary.uid)}>{summary.name}</Button>
                })}
                <Button onPress={() => setCreateCampaignModalVisible(true)}>Add new campaign</Button>
            </View>
        );
    }

    return (
        <Campaign
            campaign={loadedCampaign}
            updateCampaign={updateCampaign}
        />
    );
}
