import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import i18n from '../i18n/i18n';
import Item from './Item';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 20,
    },
    categoryTitle: {
        fontWeight: 'bold',
        flex: 2,
    },
    list: {
        flex: 6,
    },
});

const ItemList = ({ items, itemType, onAdd, onGive, onSell, onDelete }) => {
    const itemListRender = items.map((item, idx) => {
        return (
            <Item
                key={idx}
                name={item}
                onGive={onGive ? () => onGive(idx) : null}
                onSell={onSell ? () => onSell(idx) : null}
                onDelete={onDelete ? () => onDelete(idx) : null}
            />
        );
    });

    return (
        <View style={styles.root}>
            <Text style={styles.categoryTitle}>{itemType === 'item' ? i18n.t('items') : i18n.t('skills')}</Text>
            <View style={styles.list}>
                {itemListRender}
                <Button color="black" icon="plus" mode="outlined" onPress={onAdd}>
                    {i18n.t('add')}
                </Button>
            </View>
        </View>
    );
};

ItemList.propTypes = {
    items: PropTypes.array,
    itemType: PropTypes.string,
    onAdd: PropTypes.func,
    onGive: PropTypes.func,
    onSell: PropTypes.func,
    onDelete: PropTypes.func,
};

ItemList.defaultProps = {
    items: [],
    itemType: 'item',
    onAdd: undefined,
    onGive: undefined,
    onSell: undefined,
    onDelete: undefined,
};

export default ItemList;
