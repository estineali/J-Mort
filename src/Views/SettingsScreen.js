import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";
import { Ionicons } from "@expo/vector-icons";
import Header from "../Utils/Header";

export default SettingsScreen = (props) => {
  function backHandler() {
    props.navigation.goBack();
  }
  return (
    <SafeAreaView style={stylesheet.screenContainer}>
      <Header back={backHandler} title={"Settings"} />
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    borderBottomColor: ColorPalette.white,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});
