import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";
import { MyButton } from "../Utils/Buttons";

import { Ionicons } from "@expo/vector-icons";
import Header from "../Utils/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keys } from "../Utils/asyncstorageKeys";
import { useEffect, useState } from "react";

export default SettingsScreen = (props) => {
  const [username, setUsername] = useState("Jeff Malone");

  function backHandler() {
    props.navigation.goBack();
  }
  async function loadData() {
    const name = await AsyncStorage.getItem(keys.userName);
    setUsername(name);
  }

  useEffect(() => {
    // loadData();
  }, []);

  function logoutHandler() {
    AsyncStorage.removeItem(keys.userName);
    AsyncStorage.removeItem(keys.password);

    props.navigation.navigate("splash-screen");
  }
  return (
    <SafeAreaView style={stylesheet.screenContainer}>
      <Header back={backHandler} title={"Settings"} />

      <View
        style={{
          ...stylesheet.screenContainer,
          justifyContent: "space-between",
        }}
      >
        <View style={stylesheet.userDetailsContainer}>
          <View style={stylesheet.iconContainer}>
            <Ionicons
              name={"terminal-outline"}
              size={25}
              color={ColorPalette.white}
            />
          </View>
          <View style={stylesheet.userNameDescContainer}>
            <Text style={stylesheet.usernameStyle}>{username}</Text>

            <Text style={stylesheet.userDescriptionStyle}>
              I swear I'm not a machine
            </Text>
          </View>
        </View>
        <MyButton
          bgColor={"transparent"}
          borderColor={ColorPalette.white}
          width={"90%"}
          height={50}
          borderRadius={10}
          onPress={logoutHandler}
        >
          <Text style={stylesheet.buttonText}>Logout</Text>
        </MyButton>
      </View>
    </SafeAreaView>
  );
};

const stylesheet = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: ColorPalette.black,
    width: "100%",
    height: "100%",
  },
  pageTitle: {
    fontFamily: Fonts.Title,
    fontSize: 30,
    color: ColorPalette.white,
    marginLeft: 10,
  },
  buttonText: {
    color: ColorPalette.white,
    fontFamily: Fonts.Bold,
    fontSize: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    borderBottomColor: ColorPalette.white,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: ColorPalette.Red,
  },
  usernameStyle: {
    color: ColorPalette.white,
    fontFamily: Fonts.Subheading,
    marginLeft: 10,
    fontSize: 20,
  },
  userDescriptionStyle: {
    color: ColorPalette.white,
    fontFamily: Fonts.BodyText,
    marginLeft: 10,
    fontSize: 12,
  },
  userDetailsContainer: {
    backgroundColor: ColorPalette.black,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "black",
    marginTop: 20,
    marginHorizontal: 20,
    paddingBottom: 10,
    borderBottomColor: ColorPalette.white + "20",
    borderBottomWidth: 1,
  },
  userNameDescContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
  },
});
