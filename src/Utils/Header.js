import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";
import { Ionicons } from "@expo/vector-icons";

export default Header = (props) => {
  return (
    <View style={props.headerStyle ?? stylesheet.headerStyle}>
      {props.back && (
        <Pressable onPress={props.back}>
          <Ionicons name={"arrow-back"} size={20} color={ColorPalette.white} />
        </Pressable>
      )}
      <Text style={props.titleStyle ?? stylesheet.titleStyle}>
        {props.title}
      </Text>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  titleStyle: {
    fontFamily: Fonts.Title,
    fontSize: 25,
    color: ColorPalette.white,
    marginLeft: 10,
  },
  headerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    borderBottomColor: ColorPalette.white,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginTop: 10,
  },
});
