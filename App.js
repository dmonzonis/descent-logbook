import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import CampaignSelector from "./src/components/CampaignSelector";


export default function App() {
    return (
        <PaperProvider>
            <StatusBar />
            <CampaignSelector />
        </PaperProvider>
    );
}
