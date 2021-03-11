import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import ItemList from "./ItemList";
import DialogAddItem from "./Dialogs/DialogAddItem";
import DialogDeleteItem from "./Dialogs/DialogDeleteItem";


export default function HeroSheet(props) {
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedItemType, setSelectedItemType] = useState("item");
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

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
                onClose={() => setDeleteDialogVisible(false)}
                onDelete={() => deleteItemHandler(selectedItemType, selectedItemIndex)}
            />

            <View style={styles.heroSheet}>
                <View style={styles.nameArea}>
                    <Text style={styles.heroName}>{props.name}</Text>
                    <View style={styles.xpArea}>
                        <Text style={styles.xpText}>XP: {props.xp}</Text>
                    </View>
                </View>
                <Text style={styles.characterText}>{props.character} | {props.class}</Text>

                <View style={styles.separator} />

                <View>
                    <ItemList
                        itemType="item"
                        items={props.items}
                        onAdd={() => {
                            setSelectedItemType("item");
                            setAddDialogVisible(true);
                        }}
                        onGive={props.onGiveItem}
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
    heroSheet: {
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
    heroName: {
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
        marginHorizontal: 15,
    },
    separator: {
        borderBottomColor: "black",
        borderBottomWidth: 1,
        marginVertical: 5,
    },
});
