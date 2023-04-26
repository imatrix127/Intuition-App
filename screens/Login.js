import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, ScrollView } from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const openRegisterScreen = () => {
    navigation.navigate('Register');
  };
  const openForgotPassScreen = () => {
    navigation.navigate("Forgot Password")
  };

  const signin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate('Contacts');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (

    <ScrollView style={styles.container}>

      <View style={{ marginTop: 40, marginLeft: 30, flexDirection: 'row' }}>
        <Text style={styles.mainText}>Hello! Welcome back! </Text>
        <Image style={styles.tinyLogo}
          source={require('../assets/Wave.png')}
        />
      </View>
      <View style={{ marginLeft: 30, flexDirection: 'row' }}>
        <Text style={styles.subText}>Hello again, We missed you!</Text>
      </View>
      <View style={styles.email}>

        <Text style={styles.textBoxHeader}>Email Address</Text>
        <View style={styles.inputView}>

          <TextInput
            leftIcon={{ type: 'material', name: 'email' }}
            value={email}
            style={styles.TextInput}
            placeholder="Enter Your Email"
            placeholderTextColor="#aaaaaa"
            onChangeText={text => setEmail(text)}
          />

        </View>

      </View>

      <Text style={styles.textBoxHeader}>Password</Text>
      <View style={styles.inputView}>

        <TextInput
          style={styles.TextInput}
          placeholder="Enter Your Password"
          placeholderTextColor="#aaaaaa"
          secureTextEntry={true}
          label='Password'
          leftIcon={{ type: 'material', name: 'lock' }}
          value={password}
          onChangeText={text => setPassword(text)}
        />

      </View>


      <View style={styles.checkboxContainer}>
        <Text style={{ marginLeft: 50 }}>Remember Me</Text>
        <TouchableOpacity onPress={openForgotPassScreen}>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={signin} >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity >

      <View style={styles.SignUp}>
        <Text style={styles.Account}>Don't have an account? </Text>
        <TouchableOpacity onPress={openRegisterScreen} >
          <Text style={styles.SignUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    fontFamily: "Roboto",
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
  checkbox: {
    alignSelf: 'center',
  },
  mainText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 24,
    lineHeight: 36,
    color: '#000000',

  },
  subText: {
    fontFamily: "Roboto",
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
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "90%",
    height: 45,
    marginBottom: 20,
    marginLeft: 20,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#A2A7AD"

  },


  TextInput: {

    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    alignItems: "center",
  },


  forgot_button: {

    height: 30,
    marginBottom: 30,
    color: '#FF0000',
    marginLeft: 100,

  },

  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },


  loginBtn: {

    width: "90%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#188F79",
    marginLeft: 20,
    marginTop: -20,

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
    marginLeft: 20
  },
  textBoxHeader: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 13,
    lineHeight: 20,
    color: "#000000",
    marginLeft: 20,

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
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 15,
    lineHeight: 22,
    color: "#9D9393"
  },
  SignUpText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 15,
    lineHeight: 22,
    color: "#188F79"
  }

});

export default Login;