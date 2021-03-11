import React, { useState } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Campaign from "./src/components/Campaign";


export default function App() {
    const [campaigns, setCampaigns] = useState(null);

    // TEST DATA
    const [ready, setReady] = useState(false);
    if (!ready) {
        const testCampaigns = [
            {
                uid: "test",
                data: {
                    gold: 0,
                    heros: [
                        { heroName: "Player 1", heroChar: "Char 1", heroClass: "Class 1", items: [], skills: [], xp: 0 },
                        { heroName: "Player 2", heroChar: "Char 2", heroClass: "Class 2", items: [], skills: [], xp: 0 },
                        { heroName: "Player 3", heroChar: "Char 3", heroClass: "Class 3", items: [], skills: [], xp: 0 },
                    ]
                }
            }
        ];
        setCampaigns(testCampaigns);
        setReady(true);
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <PaperProvider>
            <StatusBar />
            <Campaign uid="test" data={campaigns[0].data} />
        </PaperProvider>
    );
}
