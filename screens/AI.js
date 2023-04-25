import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView, ToastAndroid, Clipboard } from "react-native";
import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { collection, addDoc, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AI = ({ navigation }) => {
    const [answersfinal, setAnswerfinal] = useState([]);
    const route = useRoute()

    const [copiedText, setCopiedText] = useState('');
    const copyToClipboard = (string) => {
        Clipboard.setString(string)
        ToastAndroid.showWithGravity("Copied", ToastAndroid.LONG, ToastAndroid.BOTTOM)
    };

    preQuestion = route.params.otherUsersMessages[0]
    const apiKey = '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';
    const question = 'I need 3 responses to ' + String('"' + preQuestion + '"');

    const data = {
        "prompt": question,
        "temperature": 0.7,
        "max_tokens": 60
    };

    useEffect(() => {
        fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                const answers = data.choices[0].text;
                const answersfinal = answers.split(/\n/);
                setAnswerfinal(answersfinal);
            })
            .catch(error => {
                console.error(error);
            })

    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.newView}>
                <TouchableOpacity>
                    <Text>{question}</Text>
                </TouchableOpacity >

                <TouchableOpacity onPress={() => copyToClipboard(answersfinal[answersfinal.length - 3])}>
                    <Text>{answersfinal[answersfinal.length - 3]}</Text>
                </TouchableOpacity >

                <TouchableOpacity onPress={() => copyToClipboard(answersfinal[answersfinal.length - 2])}>
                    <Text>{answersfinal[answersfinal.length - 2]}</Text>
                </TouchableOpacity >

                <TouchableOpacity onPress={() => copyToClipboard(answersfinal[answersfinal.length - 1])}>
                    <Text>{answersfinal[answersfinal.length - 1]}</Text>
                </TouchableOpacity >
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: "#fff",
    },

    newView: {
        marginLeft: 10,
    },

});

export default AI;