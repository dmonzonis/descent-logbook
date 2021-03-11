import React, { useState } from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import HeroSheet from "./HeroSheet"
import DialogGiveItem from "./Dialogs/DialogGiveItem";


export default function Campaign(props) {
    const [heros, setHeros] = useState(props.data.heros);
    const [giveDialogVisible, setGiveDialogVisible] = useState(false);

    const addItemHandler = (heroChar, itemType, itemName) => {
        setHeros(heros => heros.map(hero => {
            if (hero.heroChar === heroChar) {
                if (itemType === "item") {
                    return { ...hero, items: [...hero.items, itemName] };
                } else {
                    return { ...hero, skills: [...hero.skills, itemName] };
                }
            } else {
                return hero;
            }
        }));
    }

    const deleteItemHandler = (heroChar, itemType, idx) => {
        setHeros(heros => heros.map(hero => {
            if (hero.heroChar === heroChar) {
                if (itemType === "item") {
                    return { ...hero, items: hero.items.filter((_, index) => index !== idx) }
                } else {
                    return { ...hero, skills: hero.skills.filter((_, index) => index !== idx) }
                }
            } else {
                return hero;
            }
        }));
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar />

            <DialogGiveItem
                visible={giveDialogVisible}
                onClose={() => setGiveDialogVisible(false)}
                heros={heros}
            />

            {heros.map(hero => {
                return (
                    <HeroSheet
                        key={hero.heroChar}  // Character is always unique
                        name={hero.heroName}
                        character={hero.heroChar}
                        class={hero.heroClass}
                        items={hero.items}
                        skills={hero.skills}
                        xp={hero.xp}
                        setGiveDialogVisible={setGiveDialogVisible}
                        addItemHandler={(itemType, itemName) => addItemHandler(hero.heroChar, itemType, itemName)}
                        deleteItemHandler={(itemType, idx) => deleteItemHandler(hero.heroChar, itemType, idx)}
                    />
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 5,
    },
});
