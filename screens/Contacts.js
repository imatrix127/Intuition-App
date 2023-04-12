import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react'
import { auth, db } from '../firebase';
import { Avatar } from 'react-native-elements';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Touchable } from "react-native";
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';

const Contacts = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);
    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login')
        }).catch((error) => {
            // an error happend
        })
    }

    const openChatScreen = (i) => {
        email1 = String(auth?.currentUser?.email)
        email2 = String(contacts[i].email)

        if (email1 < email2)
            databaseName = email1 + email2;
        else
            databaseName = email2 + email1;
        selectedUser = contacts[i].name
        ListOfData = [databaseName, selectedUser]

        navigation.navigate('Chat', { ListOfData })

    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{
                    marginRight: 30
                }}
                    onPress={signOut}
                >
                    <Text>logout</Text>
                </TouchableOpacity>
            )
        })

        database = collection(db, 'Contacts')

        const q = query(database, orderBy('name', 'desc'));
        const getUserInfo = onSnapshot(q, (snapshot) => setContacts(
            snapshot.docs.map(doc => ({
                name: doc.data().name,
                avatar: doc.data().avatar,
                email: doc.data().email,
            }))
        ));

        return () => {
            getUserInfo();
        };
    }, [navigation])

    var fields = [];

    for (let i = 0; i < contacts.length; i++) {
        if (auth?.currentUser?.email != contacts[i].email)
            fields.push(
                <TouchableOpacity key={i} onPress={() => openChatScreen(i)}>
                    <Text style={{ marginTop: i * 10, marginLeft: 0, marginBottom: 0 }}>
                        <Avatar rounded
                            source={{ uri: contacts[i].avatar }}
                        />
                        {contacts[i].name}
                    </Text>
                </TouchableOpacity>
            )
    }

    return (
        <View styles={styles.container}>
            {fields}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: "#fff",

    },
});

export default Contacts;