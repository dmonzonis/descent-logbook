import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {
    storeCampaign,
    retrieveCampaign,
    retrieveSummaries,
    storeNewCampaignSummary,
    deleteCampaign,
} from '../storage';
import Campaign from './Campaign';
import DialogNewCampaign from './Dialogs/DialogNewCampaign';
import DialogDeleteCampaign from './Dialogs/DialogDeleteCampaign';
import i18n from '../i18n/i18n';
import { DARK_BLUE } from '../colors';

const styles = StyleSheet.create({
    root: {
        padding: 5,
    },
    campaignSummary: {
        flex: 10,
        justifyContent: 'center',
    },
    summaryRow: {
        flexDirection: 'row',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 2,
        marginVertical: 10,
        padding: 5,
    },
    summaryText: {
        color: 'black',
        fontSize: 16,
        paddingHorizontal: 10,
    },
    title: {
        marginVertical: 10,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 24,
    },
    deleteButton: {
        flex: 1,
        alignSelf: 'flex-end',
    },
});

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
    };

    const addNewCampaignHandler = (name, data) => {
        const uid = uuidv4();
        const summary = {
            uid,
            name,
            completed: false,
        };
        deleteCampaign(uid).then(() => {
            storeNewCampaignSummary(summary);
            storeCampaign(uid, data);
        });

        const summariesUpdated = summaries || [];
        setSummaries([...summariesUpdated, summary]);
    };

    const deleteCampaignHandler = (uid) => {
        deleteCampaign(uid);
        const summariesUpdated = summaries.filter((summary) => summary.uid !== uid);
        setSummaries(summariesUpdated);
        setSelectedCampaignSummary(null);
    };

    const loadCampaign = (uid) => {
        retrieveCampaign(uid).then((campaign) => {
            setLoadedCampaign(campaign);
            setLoadedCampaignUid(uid);
        });
    };

    const loadingView = (
        <View>
            <Text>Loading...</Text>
        </View>
    );

    if (!areSummariesLoaded) {
        retrieveSummaries().then((retrievedSummaries) => {
            setSummaries(retrievedSummaries);
            setAreSummariesLoaded(true);
        });
        return loadingView;
    }

    if (!loadedCampaign) {
        return (
            <ScrollView style={styles.root}>
                <DialogNewCampaign
                    visible={createCampaignDialogVisible}
                    existingNames={summaries && summaries.map((summary) => summary.name)}
                    onCreate={addNewCampaignHandler}
                    onClose={() => setCreateCampaignDialogVisible(false)}
                />
                <DialogDeleteCampaign
                    visible={deleteCampaignDialogVisible}
                    name={selectedCampaignSummary && selectedCampaignSummary.name}
                    onDelete={() => deleteCampaignHandler(selectedCampaignSummary.uid)}
                    onClose={() => setDeleteCampaignDialogVisible(false)}
                />

                <Text style={styles.title}>{i18n.t('campaigns').toUpperCase()}</Text>

                {summaries &&
                    summaries.map((summary) => {
                        return (
                            <View key={summary.uid} style={styles.summaryRow}>
                                <View style={styles.campaignSummary}>
                                    <Pressable onPress={() => loadCampaign(summary.uid)}>
                                        <View>
                                            <Text style={styles.summaryText}>{summary.name}</Text>
                                        </View>
                                    </Pressable>
                                </View>
                                <IconButton
                                    icon="delete"
                                    color="red"
                                    size={18}
                                    style={styles.deleteButton}
                                    onPress={() => {
                                        setSelectedCampaignSummary(summary);
                                        setDeleteCampaignDialogVisible(true);
                                    }}
                                />
                            </View>
                        );
                    })}
                <Button onPress={() => setCreateCampaignDialogVisible(true)} color={DARK_BLUE}>
                    {i18n.t('addNewCampaign')}
                </Button>
            </ScrollView>
        );
    }

    return (
        <Campaign campaign={loadedCampaign} updateCampaign={updateCampaign} onBack={() => setLoadedCampaign(null)} />
    );
}
