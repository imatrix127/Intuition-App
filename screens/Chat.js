import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react'
import { View, Text, LogBox } from 'react-native'
import { auth, db } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';



const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]);
    const route = useRoute()

    const openAI = () => {
        const otherUsersMessages = {}
        y = 0
        for (let i = 0; i < messages.length; i++) {
            if ((messages[i].user._id) != (auth?.currentUser?.email)) {
                otherUsersMessages[y] = messages[i].text
                y += 1
            }
        }
        navigation.navigate("AI", { otherUsersMessages })
    };

    useLayoutEffect(() => {

        LogBox.ignoreAllLogs(); //disable warnings on screen

        database = collection(db, String(route.params.ListOfData[0]))
        const q = query(database, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
        ));

        userDatabase = collection(db, 'Contacts')
        const p = query(userDatabase, orderBy('name', 'desc'));
        const getUserInfo = onSnapshot(p, (snapshot) => setContacts(
            snapshot.docs.map(doc => ({
                Username: doc.data().name,
                Useravatar: doc.data().avatar,
            }))
        ));



        return () => {
            getUserInfo();
            unsubscribe();
        };


    }, [navigation])

    navigation.setOptions({
        headerLeft: () => (
            <View style={{ marginLeft: 20 }}>

                <Avatar

                    rounded
                    source={{
                        uri: auth?.currentUser?.photoURL
                    }}
                />
                <Text>{route.params.ListOfData[1]}</Text>
            </View>


        ),

        headerRight: () => (
            <View style={{ marginRight: 20 }}>

                <TouchableOpacity onPress={openAI}>
                    <Text>AI RESPONSES</Text>
                </TouchableOpacity>

            </View>


        )
    })

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, createdAt, text, user, } = messages[0]
        addDoc(database, { _id, createdAt, text, user });

    }, [])

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL

            }}
        />
    )
};

export default Chat;