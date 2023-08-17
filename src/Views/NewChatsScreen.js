import { SafeAreaView, StyleSheet, View } from "react-native";
import Header from "../Utils/Header";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";


export default NewChatsScreen = (props) => {
  function backHandler() {
    props.navigation.goBack();
  }
  return (
    <SafeAreaView style={stylesheet.screenContainer}>
      <Header back={backHandler} title={"New Chat"}/>
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
  },
});
