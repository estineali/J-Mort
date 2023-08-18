import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";
import { MyButton } from "../Utils/Buttons";
import SeparatorComponent from "../Utils/Spacer";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keys } from "../Utils/asyncstorageKeys";


export default SplashScreen = (props) => {
  const [username, setUsername] = useState("JohnWick");
  const [password, setPassword] = useState("babayaga");


  function loginHandler() {
  // setAuth info 

    AsyncStorage.setItem(keys.userName, username);
    AsyncStorage.setItem(keys.password, password);
    props.navigation.navigate("homepage-chats-index");
    
  }


  return (
    <SafeAreaView style={stylesheet.container}>
      <StatusBar backgroundColor="auto" />
      <SeparatorComponent space={"5%"} />
      <Text style={stylesheet.titleStyle}>Jay</Text>
      <View
        style={{
          width: "70%",
          marginHorizontal: 10,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View style={stylesheet.authFieldContainer}>
          <Text style={stylesheet.labelsStyle}>Username</Text>
          <TextInput
            style={stylesheet.authInput}
            selectionColor={ColorPalette.Blue}
            color={ColorPalette.black}
            autoCorrect={false}
            placeholder={"Username"}
            placeholderTextColor={ColorPalette.DarkGrey + 80}
            maxLength={16}
            numberOfLines={1}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
        </View>
        <View style={stylesheet.authFieldContainer}>
          <Text style={stylesheet.labelsStyle}>Password</Text>
          <TextInput
            style={stylesheet.authInput}
            selectionColor={ColorPalette.Blue}
            color={ColorPalette.black}
            autoCorrect={false}
            placeholder={"Password"}
            placeholderTextColor={ColorPalette.DarkGrey + 80}
            secureTextEntry={true}
            textContentType={"password"}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>
      </View>

      <MyButton
        bgColor={"transparent"}
        borderColor={ColorPalette.white}
        width={"60%"}
        height={50}
        borderRadius={10}
        onPress={loginHandler}
      >
        <Text style={stylesheet.buttonText}>Login</Text>
      </MyButton>

      <Text
        style={{
          color: ColorPalette.white,
          fontFamily: Fonts.BodyText,
          fontSize: 11,
          textAlign: "center",
        }}
      >
        A Speculative Design Prototype {"\n"} by Femke Kocken & M. Shahrom Ali.
      </Text>
    </SafeAreaView>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.black,
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleStyle: {
    color: ColorPalette.white,
    fontFamily: Fonts.Medium,
    fontSize: 40,
  },

  buttonText: {
    color: ColorPalette.white,
    fontFamily: Fonts.Heading,
    fontSize: 24,
  },

  labelsStyle: {
    color: ColorPalette.white,
    fontFamily: Fonts.Subheading,
    fontSize: 20,
  },
  authFieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  authInput: {
    backgroundColor: ColorPalette.white,
    fontSize: 14,
    fontFamily: Fonts.Subheading,
    borderColor: ColorPalette.DarkGrey + 50,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    width: "60%",
    height: 30,
  },
});
