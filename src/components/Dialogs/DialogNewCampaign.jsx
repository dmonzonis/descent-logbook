import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, Dialog, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import { DARK_BLUE } from '../../colors';

const styles = StyleSheet.create({
    formRoot: {
        backgroundColor: 'white',
        height: '80%',
    },
    heroData: {
        flexDirection: 'row',
    },
    heroTextInput: {
        flex: 1,
    },
});

const DialogNewCampaign = ({ visible, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [heros, setHeros] = useState([{ playerChar: '', playerClass: '' }]);

    const addHero = () => {
        setHeros((newHeros) => [
            ...newHeros,
            {
                playerChar: '',
                playerClass: '',
            },
        ]);
    };

    const completeData = () => {
        let players = heros.map((hero) => {
            return {
                ...hero,
                xp: 0,
                isDarkLord: false,
                items: [],
                skills: [],
            };
        });
        players = [
            ...players,
            {
                playerChar: 'Dark Lord',
                playerClass: null,
                isDarkLord: true,
                xp: 0,
                items: [],
                skills: [],
            },
        ];
        return {
            gold: 0,
            players,
        };
    };

    const isDataInvalid = () => {
        if (heros.length === 0 || name === '') {
            return true;
        }
        const heroChars = new Set();
        for (const hero of heros) {
            if (hero.playerChar === '' || hero.playerClass === '') {
                return true;
            }
            heroChars.add(hero.playerChar);
        }
        if (heroChars.size !== heros.length || heroChars.has('Dark Lord')) {
            // There is a repeated character, they have to be unique
            return true;
        }
        return false;
    };

    const modifyHeroAttrib = (idx, type, attrib) => {
        const herosUpdated = heros.slice();
        switch (type) {
            case 'char':
                herosUpdated[idx].playerChar = attrib;
                break;
            case 'class':
                herosUpdated[idx].playerClass = attrib;
                break;
            default:
                break;
        }
        setHeros(herosUpdated);
    };

    const cleanForm = () => {
        setName('');
        setHeros([[{ playerChar: '', playerClass: '' }]]);
    };

    const onCloseHandler = () => {
        onClose();
        cleanForm();
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onCloseHandler} style={styles.formRoot}>
                <Dialog.Title>New campaign</Dialog.Title>
                <Dialog.ScrollArea>
                    <ScrollView>
                        <Text>Campaign</Text>
                        <TextInput
                            label="Campaign name"
                            defaultValue={name}
                            onChangeText={(text) => setName(text)}
                            dense
                        />

                        {heros.map((hero, idx) => {
                            return (
                                <View key={idx}>
                                    <Text>Hero {idx + 1}</Text>
                                    <TextInput
                                        style={styles.heroTextInput}
                                        label="Character"
                                        defaultValue={hero.playerChar}
                                        dense
                                        onChangeText={(text) => modifyHeroAttrib(idx, 'char', text)}
                                    />
                                    <TextInput
                                        style={styles.heroTextInput}
                                        label="Class"
                                        defaultValue={hero.playerClass}
                                        dense
                                        onChangeText={(text) => modifyHeroAttrib(idx, 'class', text)}
                                    />
                                </View>
                            );
                        })}

                        {heros.length < 4 && (
                            <Button color={DARK_BLUE} onPress={() => addHero()}>
                                Add player
                            </Button>
                        )}
                    </ScrollView>
                </Dialog.ScrollArea>
                <Dialog.Actions>
                    <Button color="red" onPress={onCloseHandler}>
                        Cancel
                    </Button>
                    <Button
                        disabled={isDataInvalid()}
                        color={DARK_BLUE}
                        onPress={() => {
                            const data = completeData();
                            onCreate(name, data);
                            onCloseHandler();
                        }}
                    >
                        Add
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

DialogNewCampaign.propTypes = {
    visible: PropTypes.bool,
    onCreate: PropTypes.func,
    onClose: PropTypes.func,
};

DialogNewCampaign.defaultProps = {
    visible: false,
    onCreate: undefined,
    onClose: undefined,
};

export default DialogNewCampaign;
