import AsyncStorage from '@react-native-async-storage/async-storage';


const APP_COMMON_KEY = "@dmonzonis-descent-logbook";

const getKey = uid => APP_COMMON_KEY + "/" + uid;

const storeCampaign = async (uid, campaign) => {
    try {
        const jsonData = JSON.stringify(campaign);
        await AsyncStorage.setItem(getKey(uid), jsonData);
    } catch (e) {
        console.error("Error saving data to device storage");
    }
}

const retrieveCampaign = async (uid) => {
    try {
        const jsonData = await AsyncStorage.getItem(getKey(uid));
        if (jsonData !== null) {
            return JSON.parse(jsonData);
        }
        return null;
    } catch (e) {
        console.error("Error retrieving data from device storage");
    }
}

export { storeCampaign, retrieveCampaign }
