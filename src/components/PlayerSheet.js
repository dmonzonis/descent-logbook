import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import ItemList from "./ItemList";
import DialogModifyNumericValue from "./Dialogs/DialogModifyNumericValue";
import DialogAddItem from "./Dialogs/DialogAddItem";
import DialogDeleteItem from "./Dialogs/DialogDeleteItem";


const PlayerSheet = (props) => {
    const [modifyXpDialogVisible, setModifyXpDialogVisible] = useState(false);
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedItemType, setSelectedItemType] = useState("item");
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const addItemHandler = (itemType, itemName) => {
        props.addItemHandler(itemType, itemName);
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
        if (props.isDarkLord) {
            return null;
        } else {
            return <Text style={styles.classText}>{props.class}</Text>;
        }
    }

    return (
        <View>
            <DialogAddItem
                visible={addDialogVisible}
                type={selectedItemType}
                onClose={() => setAddDialogVisible(false)}
                onAdd={(itemName) => addItemHandler(selectedItemType, itemName)}
            />
            <DialogDeleteItem
                visible={deleteDialogVisible}
                type={selectedItemType}
                itemName={props.items[selectedItemIndex]}
                onClose={() => setDeleteDialogVisible(false)}
                onDelete={() => deleteItemHandler(selectedItemType, selectedItemIndex)}
            />
            <DialogModifyNumericValue
                name="XP"
                visible={modifyXpDialogVisible}
                currentValue={props.xp}
                atomicAmount={1}
                onClose={() => setModifyXpDialogVisible(false)}
                onModifyValue={props.modifyXpHandler}
            />

            <View style={styles.playerSheet}>
                <View style={styles.nameArea}>
                    <Text style={styles.playerChar}>{props.character}</Text>
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
                        onGive={props.isDarkLord ? null : props.onGiveItem}
                        onSell={(idx) => onDeleteItem("item", idx)}
                    />
                    <ItemList
                        itemType="skill"
                        items={props.skills}
                        onAdd={() => {
                            setSelectedItemType("skill");
                            setAddDialogVisible(true);
                        }}
                        onDelete={(idx) => onDeleteItem("skill", idx)}
                    />
                </View>
            </View >
        </View>
    );
}

PlayerSheet.propTypes = {
    isDarkLord: PropTypes.bool,
    name: PropTypes.string,
    character: PropTypes.string,
    class: PropTypes.string,
    xp: PropTypes.number,
    items: PropTypes.array,
    skills: PropTypes.array,
    onGiveItem: PropTypes.func,
    modifyXpHandler: PropTypes.func,
    addItemHandler: PropTypes.func,
    deleteItemHandler: PropTypes.func,
};

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
    playerChar: {
        fontSize: 24,
        marginRight: 5,
    },
    classText: {
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

export default PlayerSheet;
