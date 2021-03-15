import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';

const Item = (props) => {
    return (
        <View style={styles.root}>
            <Text style={styles.itemText}>{props.name}</Text>
            <View style={styles.buttonArea}>
                {props.onGive &&
                    <IconButton icon="share" color="black" size={20} onPress={props.onGive} />
                }
                {props.onSell &&
                    <IconButton icon="delete" color="black" size={20} onPress={props.onSell} />
                }
                {props.onDelete &&
                    <IconButton icon="delete" color="black" size={20} onPress={props.onDelete} />
                }
            </View>
        </View>
    );
}

Item.propTypes = {
    name: PropTypes.string,
    onGive: PropTypes.func,
    onSell: PropTypes.func,
    onDelete: PropTypes.func,
};

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
});

export default Item;
