import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import ItemList from "./ItemList";
import DialogModifyXp from "./Dialogs/DialogModifyXp";
import DialogAddItem from "./Dialogs/DialogAddItem";
import DialogDeleteItem from "./Dialogs/DialogDeleteItem";


export default function PlayerSheet(props) {
    const [modifyXpDialogVisible, setModifyXpDialogVisible] = useState(false);
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedItemType, setSelectedItemType] = useState("item");
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const modifyXpHandler = (xp) => {
        props.modifyXpHandler(xp);
    }

    const addItemHandler = (itemType, itemName) => {
        props.addItemHandler(itemType, itemName);
    }

    const sellItemHandler = (idx) => {
        // Item type is implied to be "item"; one cannot sell skills
        // TODO: Show modal asking the amount of gold to sell for
        deleteItemHandler("item", idx);
    }

    const deleteItemHandler = (itemType, idx) => {
        props.deleteItemHandler(itemType, idx);
    }

    const onDeleteItem = (itemType, idx) => {
        setSelectedItemType(itemType);
        setSelectedItemIndex(idx);
        setDeleteDialogVisible(true);
    }

    const getCharDescription = () => {
        if (props.character !== "Dark Lord") {
            return <Text style={styles.characterText}>{props.character} | {props.class}</Text>;
        } else {
            return <Text style={styles.characterText}>{props.character}</Text>;
        }
    }

    return (
        <View>
            <DialogAddItem
                visible={addDialogVisible}
                type={selectedItemType}
                onClose={() => setAddDialogVisible(false)}
                onAdd={addItemHandler.bind(this, selectedItemType)}
            />
            <DialogDeleteItem
                visible={deleteDialogVisible}
                type={selectedItemType}
                itemName={props.items[selectedItemIndex]}
                onClose={() => setDeleteDialogVisible(false)}
                onDelete={() => deleteItemHandler(selectedItemType, selectedItemIndex)}
            />
            <DialogModifyXp
                visible={modifyXpDialogVisible}
                onClose={() => setModifyXpDialogVisible(false)}
                onModifyXp={modifyXpHandler}
            />

            <View style={styles.playerSheet}>
                <View style={styles.nameArea}>
                    <Text style={styles.playerName}>{props.name}</Text>
                    <View style={styles.xpArea}>
                        <Text style={styles.xpText}>XP: {props.xp}</Text>
                        <IconButton icon="pencil" color="black" size={20} onPress={() => setModifyXpDialogVisible(true)} />
                    </View>
                </View>
                {getCharDescription()}

                <View style={styles.separator} />

                <View>
                    <ItemList
                        itemType="item"
                        items={props.items}
                        onAdd={() => {
                            setSelectedItemType("item");
                            setAddDialogVisible(true);
                        }}
                        onGive={props.character !== "Dark Lord" && props.onGiveItem}
                        onSell={onDeleteItem.bind(this, "item")}
                    />
                    <ItemList
                        itemType="skill"
                        items={props.skills}
                        onAdd={() => {
                            setSelectedItemType("skill");
                            setAddDialogVisible(true);
                        }}
                        onDelete={onDeleteItem.bind(this, "skill")}
                    />
                </View>
            </View >
        </View>
    );
}

const styles = StyleSheet.create({
    playerSheet: {
        textAlign: "center",
        alignSelf: "stretch",
        padding: 10,
        margin: 12,
        paddingHorizontal: 18,
        borderRadius: 10,
        borderWidth: 2
    },
    nameArea: {
        flexDirection: "row",
        alignContent: "stretch",
        alignItems: "center",
    },
    playerName: {
        fontSize: 24,
        marginRight: 5,
    },
    characterText: {
        fontSize: 13,
        fontStyle: "italic",
    },
    xpArea: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    xpText: {
        fontSize: 18,
    },
    separator: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginVertical: 5,
    },
});
