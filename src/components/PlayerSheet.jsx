import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import ItemList from './ItemList';
import DialogModifyNumericValue from './Dialogs/DialogModifyNumericValue';
import DialogAddItem from './Dialogs/DialogAddItem';
import DialogDeleteItem from './Dialogs/DialogDeleteItem';

const styles = StyleSheet.create({
    playerSheet: {
        textAlign: 'center',
        alignSelf: 'stretch',
        padding: 10,
        margin: 12,
        paddingHorizontal: 18,
        borderRadius: 10,
        borderWidth: 2,
    },
    nameArea: {
        flexDirection: 'row',
        alignContent: 'stretch',
        alignItems: 'center',
    },
    playerChar: {
        fontSize: 24,
        marginRight: 5,
    },
    classText: {
        fontSize: 13,
        fontStyle: 'italic',
    },
    xpArea: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    xpText: {
        fontSize: 18,
    },
    separator: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 5,
    },
});

const PlayerSheet = ({
    character,
    playerClass,
    xp,
    isDarkLord,
    items,
    skills,
    onGiveItem,
    addItemHandler,
    deleteItemHandler,
    modifyXpHandler,
}) => {
    const [modifyXpDialogVisible, setModifyXpDialogVisible] = useState(false);
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [selectedItemType, setSelectedItemType] = useState('item');
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);

    const onDeleteItem = (itemType, idx) => {
        setSelectedItemType(itemType);
        setSelectedItemIndex(idx);
        setDeleteDialogVisible(true);
    };

    const getCharDescription = () => {
        if (isDarkLord) {
            return null;
        }
        return <Text style={styles.classText}>{playerClass}</Text>;
    };

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
                itemName={items[selectedItemIndex]}
                onClose={() => setDeleteDialogVisible(false)}
                onDelete={() => deleteItemHandler(selectedItemType, selectedItemIndex)}
            />
            <DialogModifyNumericValue
                name="XP"
                visible={modifyXpDialogVisible}
                currentValue={xp}
                atomicAmount={1}
                onClose={() => setModifyXpDialogVisible(false)}
                onModifyValue={modifyXpHandler}
            />

            <View style={styles.playerSheet}>
                <View style={styles.nameArea}>
                    <Text style={styles.playerChar}>{character}</Text>
                    <View style={styles.xpArea}>
                        <Text style={styles.xpText}>XP: {xp}</Text>
                        <IconButton
                            icon="pencil"
                            color="black"
                            size={20}
                            onPress={() => setModifyXpDialogVisible(true)}
                        />
                    </View>
                </View>
                {getCharDescription()}

                <View style={styles.separator} />

                <View>
                    <ItemList
                        itemType="item"
                        items={items}
                        onAdd={() => {
                            setSelectedItemType('item');
                            setAddDialogVisible(true);
                        }}
                        onGive={isDarkLord ? null : onGiveItem}
                        onSell={(idx) => onDeleteItem('item', idx)}
                    />
                    <ItemList
                        itemType="skill"
                        items={skills}
                        onAdd={() => {
                            setSelectedItemType('skill');
                            setAddDialogVisible(true);
                        }}
                        onDelete={(idx) => onDeleteItem('skill', idx)}
                    />
                </View>
            </View>
        </View>
    );
};

PlayerSheet.propTypes = {
    isDarkLord: PropTypes.bool,
    character: PropTypes.string,
    playerClass: PropTypes.string,
    xp: PropTypes.number,
    items: PropTypes.array,
    skills: PropTypes.array,
    onGiveItem: PropTypes.func,
    modifyXpHandler: PropTypes.func,
    addItemHandler: PropTypes.func,
    deleteItemHandler: PropTypes.func,
};

PlayerSheet.defaultProps = {
    isDarkLord: false,
    character: undefined,
    playerClass: undefined,
    xp: 0,
    items: [],
    skills: [],
    onGiveItem: undefined,
    modifyXpHandler: undefined,
    addItemHandler: undefined,
    deleteItemHandler: undefined,
};

export default PlayerSheet;
