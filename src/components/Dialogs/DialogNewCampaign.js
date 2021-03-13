import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, Dialog, Portal } from 'react-native-paper';
import TextInput from "../TextInput";
import { DARK_BLUE } from "../../colors";

export default function DialogNewCampaign(props) {
    const [name, setName] = useState("");
    const [darkLordName, setDarkLordname] = useState("");
    const [heros, setHeros] = useState([]);

    const addHero = () => {
        setHeros(heros => [...heros, {
            playerName: "",
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
            playerName: darkLordName,
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

    const isThereMissingData = () => {
        if (heros.length === 0 ||
            name === "" ||
            darkLordName === "") {
            return true;
        }
        for (const hero of heros) {
            if (hero.playerName === "" ||
                hero.playerChar === "" ||
                hero.playerClass === "") {
                return true;
            }
        }
        return false;
    }

    const modifyHeroAttrib = (idx, type, attrib) => {
        const herosUpdated = heros.map((hero, heroIdx) => {
            if (heroIdx === idx) {
                switch (type) {
                    case "name":
                        hero.playerName = attrib;
                        break;
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
        console.log("UPDATED:");
        console.log(herosUpdated);
        setHeros(herosUpdated);
    }

    const cleanForm = () => {
        setName("");
        setDarkLordname("");
        setHeros([]);
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
                            value={name}
                            onChangeText={text => setName(text)}
                            dense={true}
                        />

                        <Text>Dark Lord</Text>
                        <TextInput
                            label="Dark Lord name"
                            value={darkLordName}
                            onChangeText={text => setDarkLordname(text)}
                            dense={true}
                        />

                        {heros.map((hero, idx) => {
                            console.log(hero);
                            return (
                                <View key={idx}>
                                    <Text>Hero {idx + 1}</Text>
                                    <TextInput
                                        label="Hero name"
                                        value={hero.playerName}
                                        dense={true}
                                        onChangeText={text => modifyHeroAttrib(idx, "name", text)}
                                    />
                                    <View style={styles.heroData}>
                                        <TextInput
                                            style={styles.heroTextInput}
                                            label="Character"
                                            value={hero.playerChar}
                                            dense={true}
                                            onChangeText={text => modifyHeroAttrib(idx, "char", text)}
                                        />
                                        <TextInput
                                            style={styles.heroTextInput}
                                            label="Class"
                                            value={hero.playerClass}
                                            dense={true}
                                            onChangeText={text => modifyHeroAttrib(idx, "class", text)}
                                        />
                                    </View>
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
                        disabled={isThereMissingData()}
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
