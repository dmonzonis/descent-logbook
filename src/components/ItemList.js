import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Item from "./Item";


export default function ItemList(props) {
    const itemListRender = props.items.map((item, idx) => {
        return (
            <Item
                key={idx}
                name={item}
                onGive={props.onGive ? () => props.onGive(idx) : null}
                onSell={props.onSell ? () => props.onSell(idx) : null}
                onDelete={props.onDelete ? () => props.onDelete(idx) : null}
            />
        );
    });

    return (
        <View style={styles.root}>
            <Text style={styles.categoryTitle}>
                {
                    props.itemType === "item"
                        ? "Item"
                        : "Skill"
                }
            </Text>
            <View style={styles.list}>
                {itemListRender}
                <View style={styles.button}>
                    <Button title="ADD" color="black" onPress={props.onAdd} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 20,
    },
    categoryTitle: {
        fontWeight: "bold",
        flex: 1
    },
    list: {
        flex: 5
    },
    button: {
        width: "23%",
    },
});
