import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import ItemList from "./ItemList";


export default function HeroSheet(props) {
    const [xp, setXp] = useState(0);
    const [skills, setSkills] = useState([]);
    const [items, setItems] = useState([]);
    const [giveModalVisible, setGiveModalVisible] = useState(false);

    const modifyXp = (amount) => {
        if (xp + amount >= 0) {
            setXp(xp => xp + amount);
        }
    }

    const addItemHandler = (itemType, name) => {
        if (itemType === "item") {
            setItems(items => [...items, name]);
        } else {
            setSkills(skills => [...skills, name]);
        }
    }

    const giveItemHandler = (idx) => {
        // Item type is implied to be "item"; one cannot sell skills
        // TODO: Show modal asking who to give the item to
        setGiveModalVisible(true);
    }

    const sellItemHandler = (idx) => {
        // Item type is implied to be "item"; one cannot sell skills
        // TODO: Show modal asking the amount of gold to sell for
        deleteItemHandler("item", idx);
    }

    const deleteItemHandler = (itemType, idx) => {
        let itemsUpdated = itemType == "item" ? items.slice() : skills.slice();
        itemsUpdated.splice(idx, 1);
        itemType == "item" ? setItems(itemsUpdated) : setSkills(itemsUpdated);
    }

    return (
        <View>
            {/* <ModalGiveItem visible={giveModalVisible} onClose={() => setGiveModalVisible(false)} /> */}

            <View style={styles.heroSheet}>
                <View style={styles.nameArea}>
                    <Text style={styles.heroName}>{props.name}</Text>
                    <View style={styles.xpArea}>
                        <Pressable onPress={() => modifyXp(-1)}>
                            <AntDesign name="minuscircle" size={20} color="black" />
                        </Pressable>
                        <Text style={styles.xpText}>XP: {xp}</Text>
                        <Pressable onPress={() => modifyXp(1)}>
                            <AntDesign name="pluscircle" size={20} color="black" />
                        </Pressable>
                    </View>
                </View>
                <Text style={styles.characterText}>{props.character} | {props.class}</Text>

                <View style={styles.separator} />

                <View>
                    <ItemList
                        itemType="item" items={items}
                        onAdd={() => addItemHandler("item")}
                        onGive={giveItemHandler}
                        onSell={sellItemHandler.bind(this, "item")}
                    />
                    <ItemList
                        itemType="skill"
                        items={skills}
                        onAdd={() => addItemHandler("skill")}
                        onDelete={deleteItemHandler.bind(this, "skill")}
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
