/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';


const APP_COMMON_KEY = "@dmonzonis-descent-logbook";
const CAMPAIGN_SUMMARIES_KEY = `${APP_COMMON_KEY}/summaries`;

const getCampaignKey = uid => `${APP_COMMON_KEY}/campaign/${uid}`;

const storeData = async (key, data) => {
    try {
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonData);
    } catch (e) {
        console.error("Error saving data to device storage");
    }
    return null;
}

const retrieveData = async (key) => {
    try {
        const jsonData = await AsyncStorage.getItem(key);
        if (jsonData !== null) {
            return JSON.parse(jsonData);
        }
        return null;
    } catch (e) {
        console.error("Error retrieving data from device storage");
    }
    return null;
}

const retrieveCampaign = (uid) => retrieveData(getCampaignKey(uid));

const storeCampaign = (uid, campaign) => storeData(getCampaignKey(uid), campaign);

const retrieveSummaries = () => retrieveData(CAMPAIGN_SUMMARIES_KEY);

const storeNewCampaignSummary = async (summary) => {
    let summaries = await retrieveSummaries();
    if (!summaries) summaries = [];
    storeData(CAMPAIGN_SUMMARIES_KEY, [...summaries, summary]);
}

const updateCampaignSummary = async (summary) => {
    const summaries = await retrieveSummaries();
    if (!summaries) return;
    const summariesUpdated = summaries.map(storedSummary => {
        return summary.uid === storedSummary.uid ? summary : storedSummary;
    });
    storeData(CAMPAIGN_SUMMARIES_KEY, summariesUpdated);
}

const deleteCampaign = async (uid) => {
    // Remove from summaries
    const summaries = await retrieveSummaries();
    if (!summaries) return;
    const summariesUpdated = summaries.filter(summary => summary.uid !== uid);
    await storeData(CAMPAIGN_SUMMARIES_KEY, summariesUpdated);

    // Remove campaign data from storage
    try {
        await AsyncStorage.removeItem(getCampaignKey(uid));
    } catch (e) {
        console.error("Error deleting campaign data from device storage");
    }
}

export {
    storeCampaign,
    retrieveCampaign,
    retrieveSummaries,
    storeNewCampaignSummary,
    deleteCampaign,
    updateCampaignSummary
}
