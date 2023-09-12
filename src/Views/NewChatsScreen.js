import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import Header from "../Utils/Header";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";
import { Ionicons } from "@expo/vector-icons";
import bots from "../Utils/bots";

const BotListEntry = (props) => {
  return (
    <Pressable onPress={props.onPress} style={stylesheet.listEntryContainer}>
      <View
        style={{ ...stylesheet.iconContainer, backgroundColor: props.color }}
      >
        <Ionicons name={props.icon} size={25} color={ColorPalette.white} />
      </View>
      <View style={stylesheet.botNameDescContainer}>
        <Text style={stylesheet.botNameStyle}>Jay {props.name}</Text>

        <Text style={stylesheet.botDescStyle}>{props.description}</Text>
      </View>
    </Pressable>
  );
};

export default NewChatsScreen = (props) => {
  function backHandler() {
    props.navigation.goBack();
  }

  function newChatHandler(bot_index) {
    if (bots[bot_index].name == bots[0].name) {
      props.navigation.navigate("chat-screen");
    } else {
      Alert.alert("Jay", `${bots[bot_index].name} ${bots[bot_index].message}.`)
    }
  }

  return (
    <SafeAreaView style={stylesheet.screenContainer}>
      <Header back={backHandler} title={"New Chat"} />
      <Text style={stylesheet.description}>
        Start a chat with one of the bots
      </Text>

      {bots.map((bot, idx) => {
        return (
          <BotListEntry
            key={idx}
            name={bot.name}
            description={bot.description}
            icon={bot.icon}
            color={bot.color}
            onPress={() => newChatHandler(idx)}
          />
        );
      })}
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
  description: {
    color: ColorPalette.white,
    fontSize: 14,
    fontFamily: Fonts.BodyText,
    textAlign: "center",
    marginVertical: 20,
  },
  listEntryContainer: {
    backgroundColor: ColorPalette.black,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
    marginLeft: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  botNameDescContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "80%",
  },
  botNameStyle: {
    color: ColorPalette.white,
    fontFamily: Fonts.Subheading,
    marginLeft: 10,
    fontSize: 16,
  },
  botDescStyle: {
    color: ColorPalette.white,
    fontFamily: Fonts.BodyText,
    marginLeft: 10,
    fontSize: 12,
  },
});
