import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";
import { MyButton } from "../Utils/Buttons";
import SeparatorComponent from "../Utils/Spacer";

export default SplashScreen = (props) => {
  function startHandler() {
    props.navigation.navigate("homepage-chats-index");
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="auto" />
      <Text style={styles.titleStyle}>Jay</Text>
      <SeparatorComponent space={"40%"} />
      <MyButton
        bgColor={"transparent"}
        borderColor={ColorPalette.white}
        width={"90%"}
        height={50}
        borderRadius={10}
        onPress={startHandler}
      >
        <Text style={styles.buttonText}>Start</Text>
      </MyButton>

      <Text
        style={{
          color: ColorPalette.white,
          fontFamily: Fonts.BodyText,
          fontSize: 11,
          textAlign: "center"
        }}
      >
        A Prototype by Femke Kocken & M. Shahrom Ali.
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: Fonts.Bold,
    fontSize: 20,
  },
});
