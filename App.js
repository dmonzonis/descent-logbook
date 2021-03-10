import React from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import HeroSheet from "./src/components/HeroSheet"

export default function App() {
    const heros = Array(4).fill(null);

    // Test data
    heros.push(<HeroSheet name="Player 1" character="Char 1" class="Class 1" key="1" />);
    heros.push(<HeroSheet name="Player 2" character="Char 2" class="Class 2" key="2" />);
    heros.push(<HeroSheet name="Player 3" character="Char 3" class="Class 3" key="3" />);

    return (
        <PaperProvider>
            <ScrollView style={styles.container}>
                <StatusBar />
                {heros}
            </ScrollView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 5,
    },
});
