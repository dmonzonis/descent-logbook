import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignContent: 'stretch',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 10,
        marginBottom: 7,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
    },
    itemText: {
        flex: 2,
    },
    buttonArea: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-end',
    },
});

const Item = ({ name, onGive, onSell, onDelete }) => {
    return (
        <View style={styles.root}>
            <Text style={styles.itemText}>{name}</Text>
            <View style={styles.buttonArea}>
                {onGive && <IconButton icon="share" color="black" size={20} onPress={onGive} />}
                {onSell && <IconButton icon="delete" color="black" size={20} onPress={onSell} />}
                {onDelete && <IconButton icon="delete" color="black" size={20} onPress={onDelete} />}
            </View>
        </View>
    );
};

Item.propTypes = {
    name: PropTypes.string,
    onGive: PropTypes.func,
    onSell: PropTypes.func,
    onDelete: PropTypes.func,
};

Item.defaultProps = {
    name: '',
    onGive: undefined,
    onSell: undefined,
    onDelete: undefined,
};

export default Item;
