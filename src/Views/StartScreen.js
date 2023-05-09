import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";
import SeparatorComponent from "../Utils/Spacer";
import { MyButton } from "../Utils/Buttons";

export default WelcomeScreen = () => {
  function startHandler() {
    console.log("Start Button Pressed");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Welcome to JMort</Text>

      <SeparatorComponent space={100} />
      <MyButton
        bgColor={ColorPalette.Orange}
        width={"90%"}
        height={50}
        borderRadius={10}
        onPress={startHandler}
      >
        <Text style={styles.buttonText}> Press Me </Text>
      </MyButton>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPalette.white,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: "15%"
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
