import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
    
  
    const openRegisterScreen = () => {
      navigation.navigate('Register');
    };
    const openLoginScreen = () => {
        navigation.navigate('Login')
    };
  
    
    
  
    return (
      <View style={styles.container}>
        <View >
         
        <Image style={styles.tinyLogo2}
          source={require('/Users/sryan19@students.desu.edu/Dev/Intuition-App/assets/afroTexting.jpg')}
          />
          <Image style={styles.tinyLogo}
          source={require('/Users/sryan19@students.desu.edu/Dev/Intuition-App/assets/couchTexting.jpg')}
          />
          <Image style={styles.tinyLogo1}
          source={require('/Users/sryan19@students.desu.edu/Dev/Intuition-App/assets/bedTexting.webp')}
          />
          
        </View>
        <View style={{marginBottom:30,marginLeft:20}}>
            <Text style={styles.mainText}>
                Lets Get 
            </Text>
            <Text style={styles.mainText}>
                Started
            </Text>
            <Text style={styles.subText}>
            Connect with each other through chatting.
            </Text>
            <Text style={styles.subText}>
            Enjoy safe and private texting
            </Text>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={openRegisterScreen} >
        <Text style={styles.loginText}>JOIN NOW </Text>
      </TouchableOpacity>
        <View style={styles.LogIn}>
            <Text style={styles.Account}>Already got an account? </Text>
            <TouchableOpacity onPress={openLoginScreen}>
                <Text style={styles.LogInText}>Log in</Text>
            </TouchableOpacity>
        </View>

        
        </View>
    )
  }

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: "#188F79",
    },
    mainText:{
        fontFamily: "Roboto",
        fontStyle: "Bold",
        fontSize: 45,
        color:"#fff",
        Align: "Left",
        verticalAlign: "Top",

    },
    subText:{
        fontFamily: "Roboto",
        fontStyle: "Regular",
        fontSize: 16,
        color:"#fff",
        Align: "Left",
        verticalAlign: "Top",
        marginTop:10

    },
    image:{ 
        width: 112.06,
        height: 147.94,
    },
    LogIn: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 70
    },
  
    loginText:
    {
      color: "#188F79"
    },
  
    inputView: {
      backgroundColor: "#fff",
      borderRadius: 5,
      width: "90%",
      height: 45,
      marginBottom: 20,
      marginLeft: 20,
      alignItems: "center",
      borderWidth:1,
      borderColor:"#A2A7AD"
  
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
      backgroundColor: "#fff",
      marginLeft: 20,
      marginTop: -20,
  
    },
  
    tinyLogo: {
      width: 150,
      height: 150,
      marginLeft: 220,
      marginTop: -30,
      borderRadius: 17,
      transform: [{rotate: '19.81deg'}]
    },
    tinyLogo1: {
        width: 150,
        height: 150,
        marginLeft: 40,
        borderRadius: 17,
        transform: [{rotate: '-9.59deg'}],
        marginTop: -40,
        marginBottom: 10
      },
      tinyLogo2: {
        width: 180,
        height: 150,
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 17,
        transform: [{rotate: '-15.03deg'}]
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
      color: "#C2C2C2"
    },
    LogInText: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: 15,
        lineHeight: 22,
        color: "#fff"
      },

  
  });
  

export default HomeScreen;