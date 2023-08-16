import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";

export default ChatsHomepage = (props) => {
  return (
    <SafeAreaView style={stylesheet.screenContainer}>
      <Text style={stylesheet.pageTitle}>Chats</Text>
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
    fontSize: 20,
    color: ColorPalette.white,
  },
});
