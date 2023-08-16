import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";
import { MyButton } from "../Utils/Buttons";
import { useState } from "react";

export default SplashScreen = (props) => {
  function startHandler() {
    props.navigation.navigate("chat-screen");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleStyle}>Jay M.</Text>
      <MyButton
        bgColor={ColorPalette.DarkGrey}
        width={"90%"}
        height={50}
        borderRadius={10}
        onPress={startHandler}
      >
        <Text style={styles.buttonText}>Start</Text>
      </MyButton>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: "15%",
  },

  titleStyle: {
    color: ColorPalette.DarkGrey,
    fontFamily: Fonts.Medium,
    fontSize: 40,
  },

  buttonText: {
    color: ColorPalette.white,
    fontFamily: Fonts.Bold,
    fontSize: 20,
  },
});
