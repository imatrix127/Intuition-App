import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react'
import { View, Text } from 'react-native'
import { auth } from '../firebase';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
//import { GiftedChat } from 'react-native-gifted-chat'

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {

                _id: 1,
                text: 'hello deva',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'http://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createAt,
            text,
            user
        } = messages[0]
        /*
        db.collection('chats').add({
            _id,
            createAt,
            text,
            user
        })
        */
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>

                    <Avatar

                        rounded
                        source={{
                            //uri: auth?.currentUser?.photoURL
                            uri: 'https://static.vecteezy.com/system/resources/previews/000/574/512/original/vector-sign-of-user-icon.jpg'
                        }}

                    />

                </View>
            ),
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
    }, [navigation])

    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login')
        }).catch((error) => {
            // an error happend
        })
    }
    return (
        <View>

        </View>

/*<GiftedChat
messages={messages}
showAvatarForEveryMessage={true}
onSend={messages => onSend(messages)}
user={{
    _id: auth?.currentUser?.email,
    name: auth?.currentUser?.display,
    avatar: auth?.currentUser?.photoURL

}}
/>*/
    )

};

export default Chat;