import React, { useState } from 'react';
import styles from './styles';
import { View, TextInput, TouchableOpacity, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Button } from 'react-native-elements';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const openLoginScreen = () => {
        navigation.navigate('Login')
    };

    const register = () => {
        if (password !== confirmPassword || password == "") {
            alert("Passwords don't match.")
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Registered
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name,
                    photoURL: avatar ? avatar : 'https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x',
                })
                    .then(() => {
                        alert('Registered, please login.');
                    })
                    .catch((error) => {
                        alert(error.message);
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">

                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    placeholderTextColor="#aaaaaa"
                    value={name}
                    onChangeText={text => setName(text)}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder='Enter your email'
                    label='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Enter your password'
                    label='Password'
                    value={password} onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => register()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>

                <View style={styles.LogIn}>
                    <Text style={styles.Account}>Already got an account? </Text>
                    <TouchableOpacity onPress={openLoginScreen}>
                        <Text style={styles.LogInText}>Log in</Text>
                    </TouchableOpacity>
                </View>



            </KeyboardAwareScrollView>
        </View >
    )
}

export default Register;
