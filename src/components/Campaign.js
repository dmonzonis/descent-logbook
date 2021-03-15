import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import PlayerSheet from "./PlayerSheet"
import DialogGiveItem from "./Dialogs/DialogGiveItem";
import CampaignTopBar from "./CampaignTopBar";
import GoldIndicator from "./GoldIndicator";


 const Campaign = (props) => {
    const [players, setPlayers] = useState(props.campaign.players);
    const [gold, setGold] = useState(props.campaign.gold);
    const [giveDialogVisible, setGiveDialogVisible] = useState(false);
    const [giveItemInfo, setGiveItemInfo] = useState({ playerCharOrig: null, idx: null });

    const _addItem = (players, playerChar, itemType, itemName) => {
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
        return playersUpdated;
    }

    const _deleteItem = (players, playerChar, itemType, idx) => {
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
        return playersUpdated;
    }

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

    const modifyGoldHandler = (amount) => {
        setGold(amount);
        updateCampaign({ players, gold: amount });
    }

    const addItemHandler = (playerChar, itemType, itemName) => {
        const playersUpdated = _addItem(players, playerChar, itemType, itemName);
        setPlayers(playersUpdated);
        updateCampaign({ gold, players: playersUpdated });
        return playersUpdated;
    }

    const deleteItemHandler = (playerChar, itemType, idx) => {
        const playersUpdated = _deleteItem(players, playerChar, itemType, idx);
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
        let playersCopy = players.slice();
        playersCopy = _addItem(playersCopy, playerCharDest, "item", itemName);
        playersCopy = _deleteItem(playersCopy, playerCharOrig, "item", idx);
        setPlayers(playersCopy);
        updateCampaign({ gold, players: playersCopy });
    }

    const onGiveItem = (playerCharOrig, idx) => {
        setGiveItemInfo({ playerCharOrig, idx });
        setGiveDialogVisible(true);
    }

    return (
        <View style={styles.root}>
            <CampaignTopBar onBack={props.onBack} />
            <ScrollView style={styles.sheetContainer}>
                <DialogGiveItem
                    visible={giveDialogVisible}
                    onClose={() => setGiveDialogVisible(false)}
                    onGiveItem={(playerCharDest) => giveItemHandler(giveItemInfo.playerCharOrig, giveItemInfo.idx, playerCharDest)}
                    heros={players.filter(player => player.playerChar !== giveItemInfo.playerCharOrig && !player.isDarkLord)}
                />

                <GoldIndicator
                    gold={gold}
                    onModifyGold={modifyGoldHandler}
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
                            isDarkLord={player.isDarkLord}
                            xp={player.xp}
                            onGiveItem={players.length > 1 && ((idx) => onGiveItem(player.playerChar, idx))}
                            modifyXpHandler={(xp) => modifyXpHandler(player.playerChar, xp)}
                            addItemHandler={(itemType, itemName) => addItemHandler(player.playerChar, itemType, itemName)}
                            giveItemHandler={(idx, playerCharDest) => giveItemHandler(player.playerChar, idx, playerCharDest)}
                            deleteItemHandler={(itemType, idx) => deleteItemHandler(player.playerChar, itemType, idx)}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
}

Campaign.propTypes = {
    campaign: PropTypes.object,
    updateCampaign: PropTypes.func,
    onBack: PropTypes.func,
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    sheetContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 5,
    },
});

export default Campaign;
