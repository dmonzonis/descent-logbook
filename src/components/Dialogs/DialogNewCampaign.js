import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, Dialog, Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import TextInput from "../TextInput";
import { DARK_BLUE } from "../../colors";

const DialogNewCampaign = (props) => {
    const [name, setName] = useState("");
    const [heros, setHeros] = useState([{ playerChar: "", playerClass: "" }]);

    const addHero = () => {
        setHeros(heros => [...heros, {
            playerChar: "",
            playerClass: ""
        }]);
    }

    const completeData = () => {
        let players = heros.map(hero => {
            return {
                ...hero,
                xp: 0,
                isDarkLord: false,
                items: [],
                skills: []
            }
        });
        players = [...players, {
            playerChar: "Dark Lord",
            playerClass: null,
            isDarkLord: true,
            xp: 0,
            items: [],
            skills: []
        }];
        return {
            gold: 0,
            players
        };
    }

    const isDataInvalid = () => {
        if (heros.length === 0 ||
            name === "") {
            return true;
        }
        const heroChars = new Set();
        for (const hero of heros) {
            if (hero.playerChar === "" ||
                hero.playerClass === "") {
                return true;
            }
            heroChars.add(hero.playerChar);
        }
        if (heroChars.size !== heros.length || heroChars.has("Dark Lord")) {
            // There is a repeated character, they have to be unique
            return true;
        }
        return false;
    }

    const modifyHeroAttrib = (idx, type, attrib) => {
        const herosUpdated = heros.map((hero, heroIdx) => {
            if (heroIdx === idx) {
                switch (type) {
                    case "char":
                        hero.playerChar = attrib;
                        break;
                    case "class":
                        hero.playerClass = attrib;
                        break;
                }
            }
            return hero;
        });
        setHeros(herosUpdated);
    }

    const cleanForm = () => {
        setName("");
        setHeros([[{ playerChar: "", playerClass: "" }]]);
    }

    const onClose = () => {
        props.onClose();
        cleanForm();
    }

    return (
        <Portal>
            <Dialog
                visible={props.visible}
                onDismiss={onClose}
                style={styles.formRoot}
            >
                <Dialog.Title>New campaign</Dialog.Title>
                <Dialog.ScrollArea>
                    <ScrollView>
                        <Text>Campaign</Text>
                        <TextInput
                            label="Campaign name"
                            defaultValue={name}
                            onChangeText={text => setName(text)}
                            dense={true}
                        />

                        {heros.map((hero, idx) => {
                            return (
                                <View key={idx}>
                                    <Text>Hero {idx + 1}</Text>
                                    <TextInput
                                        style={styles.heroTextInput}
                                        label="Character"
                                        defaultValue={hero.playerChar}
                                        dense={true}
                                        onChangeText={text => modifyHeroAttrib(idx, "char", text)}
                                    />
                                    <TextInput
                                        style={styles.heroTextInput}
                                        label="Class"
                                        defaultValue={hero.playerClass}
                                        dense={true}
                                        onChangeText={text => modifyHeroAttrib(idx, "class", text)}
                                    />
                                </View>
                            );
                        })}

                        {heros.length < 4 &&
                            <Button color={DARK_BLUE} onPress={() => addHero()}>Add player</Button>
                        }
                    </ScrollView>
                </Dialog.ScrollArea>
                <Dialog.Actions>
                    <Button color="red" onPress={onClose}>Cancel</Button>
                    <Button
                        disabled={isDataInvalid()}
                        color={DARK_BLUE}
                        onPress={() => {
                            const data = completeData();
                            props.onCreate(name, data);
                            onClose();
                        }}>
                        Add
                        </Button>

                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
}

DialogNewCampaign.propTypes = {
    visible: PropTypes.bool,
    onCreate: PropTypes.func,
    onClose: PropTypes.func,
};

const styles = StyleSheet.create({
    formRoot: {
        backgroundColor: "white",
        height: "80%"
    },
    heroData: {
        flexDirection: "row",
    },
    heroTextInput: {
        flex: 1
    }
});

export default DialogNewCampaign;
