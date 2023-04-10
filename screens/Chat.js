import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react'
import { View, Text } from 'react-native'
import { auth, db } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat'
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [contacts, setContacts] = useState([]);

    useLayoutEffect(() => {


        database = collection(db, 'chats2')
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