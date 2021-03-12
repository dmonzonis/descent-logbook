import React, { useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Campaign from "./src/components/Campaign";
import { storeCampaign, retrieveCampaign } from "./src/storage.js"


export default function App() {
    const [loadedCampaignUid, setLoadedCampaignUid] = useState(null);
    const [loadedCampaign, setLoadedCampaign] = useState(null);

    const updateCampaign = (campaignData) => {
        storeCampaign(loadedCampaignUid, campaignData);
    }

    // TEST DATA
    if (!loadedCampaign) {
        const testUid = "test";
        retrieveCampaign(testUid).then(campaign => {
            if (!campaign) {
                campaign = {
                    gold: 0,
                    heros: [
                        { heroName: "Player 1", heroChar: "Char 1", heroClass: "Class 1", items: [], skills: [], xp: 0 },
                        { heroName: "Player 2", heroChar: "Char 2", heroClass: "Class 2", items: [], skills: [], xp: 0 },
                        { heroName: "Player 3", heroChar: "Char 3", heroClass: "Class 3", items: [], skills: [], xp: 0 },
                    ]
                };
            }
            setLoadedCampaignUid(testUid);
            setLoadedCampaign(campaign);
        });
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <PaperProvider>
            <StatusBar />
            <Campaign
                campaign={loadedCampaign}
                updateCampaign={updateCampaign}
            />
        </PaperProvider>
    );
}
