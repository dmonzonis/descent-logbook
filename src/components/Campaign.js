import React, { useState } from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import HeroSheet from "./HeroSheet"
import DialogGiveItem from "./Dialogs/DialogGiveItem";


export default function Campaign(props) {
    const [heros, setHeros] = useState(props.data.heros);
    const [giveDialogVisible, setGiveDialogVisible] = useState(false);
    const [giveItemInfo, setGiveItemInfo] = useState({ heroCharOrig: null, idx: null });

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

    const giveItemHandler = (heroCharOrig, idx, heroCharDest) => {
        let itemName = null;
        for (hero of heros) {
            if (hero.heroChar === heroCharOrig) {
                itemName = hero.items[idx];
                break;
            }
        }
        if (!itemName) return;
        addItemHandler(heroCharDest, "item", itemName);
        deleteItemHandler(heroCharOrig, "item", idx);
    }

    const onGiveItem = (heroCharOrig, idx) => {
        console.log(heros);
        console.log(heros.length);
        setGiveItemInfo({ heroCharOrig, idx });
        setGiveDialogVisible(true);
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar />

            <DialogGiveItem
                visible={giveDialogVisible}
                onClose={() => setGiveDialogVisible(false)}
                onGiveItem={giveItemHandler.bind(this, giveItemInfo.heroCharOrig, giveItemInfo.idx)}
                heros={heros.filter(hero => hero.heroChar !== giveItemInfo.heroCharOrig)}
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
                        onGiveItem={heros.length > 1 && onGiveItem.bind(this, hero.heroChar)}
                        addItemHandler={addItemHandler.bind(this, hero.heroChar)}
                        giveItemHandler={giveItemHandler.bind(this, hero.heroChar)}
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
