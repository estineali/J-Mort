import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fonts from "../Utils/Fonts";

const MESSAGE_LENGTH_LIMIT = 200; //chars

const MessageBubble = (props) => {
  return (
    <View
      style={{
        ...styleSheet.chatBubbleContainer,
        alignSelf: props.AI ? "flex-start" : "flex-end",
        backgroundColor: props.AI
          ? ColorPalette.chatBubbleAI
          : ColorPalette.chatBubbleUser,
      }}
    >
      <Text style={styleSheet.chatMessage}>{props.text}</Text>
    </View>
  );
};

export default ChatScreen = (props) => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  async function GetHistory() {
    setHistory(JSON.parse(await AsyncStorage.getItem("chat-history")));
  }

  async function SaveHistory() {
    await AsyncStorage.setItem("chat-history", JSON.stringify(history));
  }

  // Init
  //   useEffect(() => {
  //     // Load history from async storage
  //     GetHistory();

  //     // Cleanup
  //     return SaveHistory();
  //   }, []);

  //   useEffect(() => {
  //     // save history to async storage
  //     SaveHistory();
  //   }, [history]);

  return (
    <KeyboardAvoidingView style={styleSheet.screenContainer}>
      <ScrollView
        style={{
          backgroundColor: ColorPalette.white,
          width: "100%",
          marginBottom: 10,
          padding: 10,
          borderTopColor: ColorPalette.DarkGrey,
          borderTopWidth: 1,
        }}
      >
        <MessageBubble text={"Hey There!"} AI={true} />
        <MessageBubble text={"Hey I'm Shahrom!"} />
        <MessageBubble text={"Nice to meet you I'm Jay M. !"} AI={true} />
        <MessageBubble text={"What does the M stand for?"} />
        <MessageBubble text={"Mort."} AI={true} />
        <MessageBubble text={"Oh..."} AI={false} />
        <MessageBubble text={"right"} AI={false} />
        <MessageBubble text={"Yeah"} AI={true} />
      </ScrollView>
      <TextInput
        style={styleSheet.descriptionBox}
        selectionColor={ColorPalette.Blue}
        color={ColorPalette.DarkGrey}
        placeholder={"New Message"}
        placeholderTextColor={ColorPalette.DarkGrey + 80}
        multiline
        maxLength={MESSAGE_LENGTH_LIMIT}
        numberOfLines={4}
        value={message}
        onChangeText={(text) => {
          setMessage(text);
        }}
      />
    </KeyboardAvoidingView>
  );
};

const styleSheet = StyleSheet.create({
  screenContainer: {
    marginTop: 80,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: ColorPalette.white,
    height: "100%",
    width: "100%",
  },

  descriptionBox: {
    backgroundColor: ColorPalette.lightGrey + "85",
    fontSize: 16,
    fontFamily: Fonts.Regular,
    borderColor: ColorPalette.DarkGrey + 50,
    borderWidth: 1,
    height: "20%",
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    textAlignVertical: "center",
    textAlign: "left",
    borderRadius: 10,
    width: "95%",
  },
  chatBubbleContainer: {
    maxWidth: "70%",
    backgroundColor: ColorPalette.chatBubble,
    borderRadius: 10,
    marginBottom: 10,
  },
  chatMessage: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    margin: 10,
    textAlign: "left",
  },
});
