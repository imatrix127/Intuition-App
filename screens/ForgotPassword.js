import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigation.navigate('Chat');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ marginTop: 40, marginLeft: 30, marginBottom: 30 }}>
                <Text style={styles.subText}>Enter Information Below to begin the process</Text>
            </View>
            <Input
                style={styles.TextInput}
                placeholder='Enter your email'
                placeholderTextColor="#003f5c"
                label='Email Address'
                leftIcon={{ type: 'material', name: 'email' }}
                value={email}
                onChangeText={text => setEmail(text)}
            />


            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>

        </ScrollView >
    )
}
const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: "#fff",

    },
    greyLine: {
        marginTop: 40,
        marginLeft: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        hairlineWidth: 2,
        width: 100,
        height: 0,
        color: "#CCC0C0",
    },
    or: {
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 15,
        marginLeft: 20,
        marginTop: 30,
        color: "#000000",
    },

    image: {

        marginBottom: 40,

    },
    mainText: {
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 24,
        lineHeight: 36,
        color: '#000000',

    },
    subText: {
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 13,
        lineHeight: 20,
        color: '#A8A2A2',

    },

    loginText:
    {
        color: "white"
    },

    inputView: {
        backgroundColor: "#DDDDDD",
        borderRadius: 10,
        width: "80%",
        height: 45,
        marginBottom: 20,
        marginLeft: 30,
        alignItems: "center",

    },


    TextInput: {

        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 10,

    },


    forgot_button: {

        height: 30,
        marginBottom: 30,
        color: '#FF0000',
        marginLeft: 80,

    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },


    loginBtn: {

        width: "80%",
        borderRadius: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#188F79",
        marginLeft: 30,
        marginTop: 30,

    },

    button: {
        backgroundColor: '#00726D',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },

    tinyLogo: {
        width: 50,
        height: 50,
    },
    textBoxHeader: {
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: 13,
        lineHeight: 20,
        color: "#000000",
        marginLeft: 30,

    },
    email: {
        marginTop: 80,

    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    SignUp: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 70
    },
    Account: {
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 15,
        lineHeight: 22,
        color: "#9D9393"
    },
    SignUpText: {
        fontFamily: 'Poppins',
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: 15,
        lineHeight: 22,
        color: "#188F79"
    }

});

export default Login;