import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import Fonts from "../Utils/Fonts";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keys } from "../Utils/asyncstorageKeys";

const ChatItem = (props) => {
  return (
    <Pressable
      style={{
        margin: 10,
        alignItems: "center",
        flexDirection: "row",
      }}
      onPress={props.onPress}
      onLongPress={props.longPress}
      delayLongPress={300}
    >
      <View
        style={{
          borderRadius: 30,
          width: 40,
          height: 40,
          backgroundColor: ColorPalette.Orange,
          marginVertical: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={"person"} color={ColorPalette.lightGrey} size={25} />
      </View>
      <Text
        style={{
          color: ColorPalette.white,
          fontFamily: Fonts.Subheading,
          fontSize: 18,
          marginLeft: 10,
        }}
      >
        Jay Mort
      </Text>
    </Pressable>
  );
};

export default ChatsHomepage = (props) => {
  function onPressSettingsHandler() {
    props.navigation.navigate("settings-screen");
  }

  function newChatHandler() {
    props.navigation.navigate("new-chats-screen");
  }

  function chatClickHandler() {
    props.navigation.navigate("chat-screen");
  }

  function deleteChatHandler() {
    AsyncStorage.removeItem(keys.chatHistory).then(() => {
      Alert.alert("Chat Cleared");
    });
  }
  function chatLongpressHandler() {
    //Show delete option -> resets history
    Alert.alert("Clear Chat History?", "This action cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", onPress: deleteChatHandler, style: "destructive" },
    ]);
  }

  return (
    <SafeAreaView style={stylesheet.screenContainer}>
      <View
        style={{
          borderBottomColor: ColorPalette.white,
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
        }}
      >
        <Text style={stylesheet.pageTitle}>Chats</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 60,
          }}
        >
          <Pressable onPress={newChatHandler}>
            <Ionicons name={"add"} color={ColorPalette.white} size={20} />
          </Pressable>
          <Pressable onPress={onPressSettingsHandler}>
            <Ionicons
              name={"settings-outline"}
              color={ColorPalette.white}
              size={20}
            />
          </Pressable>
        </View>
      </View>

      <ChatItem onPress={chatClickHandler} longPress={chatLongpressHandler} />
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
    fontSize: 25,
    color: ColorPalette.white,
  },
});
