import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";
import SeparatorComponent from "../Utils/Spacer";
import { MyButton } from "../Utils/Buttons";
import { useState } from "react";
import screensEnum from "../Utils/screens";
import ChatScreen from "./chatScreen";

const SplashScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleStyle}>Jay M.</Text>

      {/* <SeparatorComponent space={100} /> */}
      <MyButton
        bgColor={ColorPalette.DarkGrey}
        width={"90%"}
        height={50}
        borderRadius={10}
        onPress={props.onPressStart}
      >
        <Text style={styles.buttonText}>Start</Text>
      </MyButton>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default WelcomeScreen = () => {
  const [screen, setScreen] = useState(screensEnum.splash);

  function startHandler() {
    setScreen(screensEnum.chat);
  }

  if (screen == screensEnum.splash) {
    return <SplashScreen onPressStart={startHandler} />;
  } else {
    return <ChatScreen />;
  }
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
