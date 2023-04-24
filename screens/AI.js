import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";
import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react'

const AI = ({ navigation }) => {
    preQuestion = '"I lost my wallet"'
    const apiKey = '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';
    const question = 'I need 3 responses to ' + String(preQuestion);

    const data = {
        "prompt": question,
        "temperature": 0.7,
        "max_tokens": 60
    };
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
            answers = data.choices[0].text;
            answersfinal = answers.split(/\n/);
            return () => {
                answersfinal;
            };
        })
        .catch(error => {
            console.error(error);
        })

    return (
        <View style={styles.container}>
            <View style={styles.newView}>
                <TouchableOpacity>
                    <Text>{question}</Text>
                </TouchableOpacity >

                <TouchableOpacity>
                    <Text>{answersfinal[answersfinal.length - 3]}</Text>
                </TouchableOpacity >

                <TouchableOpacity>
                    <Text>{answersfinal[answersfinal.length - 2]}</Text>
                </TouchableOpacity >

                <TouchableOpacity>
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