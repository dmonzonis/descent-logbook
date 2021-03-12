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
            campaign = null;
            if (!campaign) {
                campaign = {
                    gold: 0,
                    players: [
                        { playerName: "Player 1", playerChar: "Char 1", playerClass: "Class 1", items: [], skills: [], xp: 0 },
                        { playerName: "Player 2", playerChar: "Char 2", playerClass: "Class 2", items: [], skills: [], xp: 0 },
                        { playerName: "Player 3", playerChar: "Char 3", playerClass: "Class 3", items: [], skills: [], xp: 0 },
                        { playerName: "Player 4", playerChar: "Dark Lord", items: [], skills: [], xp: 0 },
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
