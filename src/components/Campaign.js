import React, { useState } from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import PlayerSheet from "./PlayerSheet"
import DialogGiveItem from "./Dialogs/DialogGiveItem";


export default function Campaign(props) {
    const [players, setPlayers] = useState(props.campaign.players);
    const [gold, setGold] = useState(props.campaign.gold);
    const [giveDialogVisible, setGiveDialogVisible] = useState(false);
    const [giveItemInfo, setGiveItemInfo] = useState({ playerCharOrig: null, idx: null });

    const updateCampaign = (data) => {
        props.updateCampaign(data);
    }

    const modifyXpHandler = (playerChar, xp) => {
        const playersUpdated = players.map(player => {
            if (player.playerChar === playerChar) {
                return { ...player, xp };
            } else {
                return player;
            }
        });
        setPlayers(playersUpdated);
        updateCampaign({ gold, players: playersUpdated });
    }

    const addItemHandler = (playerChar, itemType, itemName) => {
        const playersUpdated = players.map(player => {
            if (player.playerChar === playerChar) {
                if (itemType === "item") {
                    return { ...player, items: [...player.items, itemName] };
                } else {
                    return { ...player, skills: [...player.skills, itemName] };
                }
            } else {
                return player;
            }
        });
        setPlayers(playersUpdated);
        updateCampaign({ gold, players: playersUpdated });
    }

    const deleteItemHandler = (playerChar, itemType, idx) => {
        const playersUpdated = players.map(player => {
            if (player.playerChar === playerChar) {
                if (itemType === "item") {
                    return { ...player, items: player.items.filter((_, index) => index !== idx) }
                } else {
                    return { ...player, skills: player.skills.filter((_, index) => index !== idx) }
                }
            } else {
                return player;
            }
        });
        setPlayers(playersUpdated);
        updateCampaign({ gold, players: playersUpdated });
    }

    const giveItemHandler = (playerCharOrig, idx, playerCharDest) => {
        let itemName = null;
        for (const player of players) {
            if (player.playerChar === playerCharOrig) {
                itemName = player.items[idx];
                break;
            }
        }
        if (!itemName) return;
        addItemHandler(playerCharDest, "item", itemName);
        deleteItemHandler(playerCharOrig, "item", idx);
    }

    const onGiveItem = (playerCharOrig, idx) => {
        setGiveItemInfo({ playerCharOrig, idx });
        setGiveDialogVisible(true);
    }

    return (
        <ScrollView style={styles.container}>
            <StatusBar />

            <DialogGiveItem
                visible={giveDialogVisible}
                onClose={() => setGiveDialogVisible(false)}
                onGiveItem={giveItemHandler.bind(this, giveItemInfo.playerCharOrig, giveItemInfo.idx)}
                heros={players.filter(player => player.playerChar !== giveItemInfo.playerCharOrig && player.playerChar !== "Dark Lord")}
            />

            {players.map(player => {
                return (
                    <PlayerSheet
                        key={player.playerChar}  // Character is always unique
                        name={player.playerName}
                        character={player.playerChar}
                        class={player.playerClass}
                        items={player.items}
                        skills={player.skills}
                        xp={player.xp}
                        onGiveItem={players.length > 1 && onGiveItem.bind(this, player.playerChar)}
                        modifyXpHandler={modifyXpHandler.bind(this, player.playerChar)}
                        addItemHandler={addItemHandler.bind(this, player.playerChar)}
                        giveItemHandler={giveItemHandler.bind(this, player.playerChar)}
                        deleteItemHandler={(itemType, idx) => deleteItemHandler(player.playerChar, itemType, idx)}
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
