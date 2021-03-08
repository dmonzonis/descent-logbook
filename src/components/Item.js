import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Item(props) {
    return (
        <View style={styles.root}>
            <Text style={styles.itemText}>{props.name}</Text>
            <View style={styles.buttonArea}>
                {props.onGive &&
                    <Pressable onPress={props.onGive}>
                        <AntDesign name="swap" size={20} color="black" style={styles.button} />
                    </Pressable>
                }
                {props.onSell &&
                    <Pressable onPress={props.onSell}>
                        <AntDesign name="isv" size={20} color="black" style={styles.button} />
                    </Pressable>
                }
                {props.onDelete &&
                    <Pressable onPress={props.onDelete}>
                        <AntDesign name="delete" size={20} color="black" style={styles.button} />
                    </Pressable>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        alignContent: "stretch",
        alignItems: "center",
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginBottom: 7,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
    },
    itemText: {
        flex: 2,
    },
    buttonArea: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-end",
    },
    button: {
        marginLeft: 10,
    }
});
