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
import Spacer from "../Utils/Spacer";
import { MyButton } from "../Utils/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { ResolveRequest } from "../Utils/serverutils";
import OPENAI_KEY from "../openaikey";
import PROMPTS from "../prompts";
import { StatusBar } from "expo-status-bar";

const MESSAGE_LENGTH_LIMIT = 200; //chars
const DEBUG = true;

const MessageBubble = (props) => {
  return (
    <View
      style={{
        ...styleSheet.chatBubbleContainer,
        alignSelf: props.AI ? "flex-start" : "flex-end",
        backgroundColor: props.AI
          ? ColorPalette.AIChatBubble[props.day]
          : ColorPalette.chatBubbleUser,
      }}
    >
      <Text
        style={{
          ...styleSheet.chatMessage,
          color: props.AI && props.day >= 4 && props.day <= 7 ? "white" : "black",
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};

const TopBar = (props) => {
  return (
    <View style={styleSheet.topBar}>

      {DEBUG && 
      <MyButton
        bgColor={ColorPalette.Orange + "F0"}
        width={35}
        height={35}
        borderRadius={10}
        onPress={props.onPreviousDay}
      >
        <Ionicons
          name="caret-back-outline"
          color={ColorPalette.white}
          size={20}
        />
      </MyButton> }

      <Text style={{ fontFamily: Fonts.Bold, fontSize: 18 }}>
        Day {props.day ?? 1}
      </Text>

{DEBUG && 
      <MyButton
        bgColor={ColorPalette.Orange + "F0"}
        width={35}
        height={35}
        borderRadius={10}
        onPress={props.onNextDay}
      >
        <Ionicons
          name="caret-forward-outline"
          color={ColorPalette.white}
          size={20}
        />
      </MyButton> }
    </View>
  );
};
export default ChatScreen = (props) => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [day, setDay] = useState(1);

  // Init
  useEffect(() => {
    // Load history from async storage
    GetHistory();

    // Cleanup
    // return SaveHistory();
  }, []);

  async function GetHistory() {
    setHistory(JSON.parse(await AsyncStorage.getItem("chat-history")) ?? []);
  }
  async function SaveHistory() {
    await AsyncStorage.setItem("chat-history", JSON.stringify(history));
  }
  useEffect(() => {
    // save history to async storage
    SaveHistory();
    if (DEBUG) {
      console.log([...history]);
      console.log("\n");
    }
  }, [history]);

  function nextDayHandler() {
    setDay(day == 11 ? 11 : day + 1);
    if (DEBUG) {
      console.log("Day" + (day + 1));
      console.log(PROMPTS[day + 1]);
      console.log();
    }
  }
  function previousDayhandler() {
    setDay(day == 1 ? 1 : day - 1);
    if (DEBUG) {
      console.log("Day" + (day + 1));
      console.log(PROMPTS[day + 1]);
      console.log();
    }
  }

  function parseHistory() {
    // Returns a list
    // put history into one long narrative form i.e. a list
    // To be displayed
  }

  async function onPressSend() {
    // Description - Initial Prompt
    const AIInitialDescription = PROMPTS[day];

    // Sample
    const AISample =
      "A sample conversation is bellow: \nUser: Hello!\nJM: Hey there, I am Jay.\nUser: Hi Jay, How are you doing today?\nJay: I've seen better days, how are you?\n\nNow continue conversation based only on the messages that follow now.\n\n";

    // History
    const AIChatHistory = history.join("\n");

    // New Message
    const LatestMessage = "User: " + message;

    // prompt ending - prevents user's sentence completion
    const promptEnding = "\nJay:";

    setHistory([...history, "User: " + message]);

    // ** next day

    // Send to Open AI
    const compiledPrompt =
      AIInitialDescription +
      AISample +
      AIChatHistory +
      LatestMessage +
      promptEnding;

    const config = {
      model: "text-davinci-003",
      prompt: compiledPrompt,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    ResolveRequest({
      token: OPENAI_KEY,
      method: "POST",
      url: "https://api.openai.com/v1/completions",
      body: config,
    }).then((result) => {
      if (DEBUG) {
        console.log(result.choices[0].text);
      }
      setHistory([
        ...history,
        "User: " + message,
        "Jay:" + result.choices[0].text,
      ]);
    });

    //Reset message
    setMessage("");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden backgroundColor="auto" />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styleSheet.screenContainer}>
          <TopBar
            day={day}
            onNextDay={nextDayHandler}
            onPreviousDay={previousDayhandler}
          />

          <ScrollView
            style={{
              backgroundColor: ColorPalette.background[day],
              width: "100%",
              borderTopColor: ColorPalette.DarkGrey,
              borderTopWidth: 1,
              paddingBottom: 100,
            }}
          >
            {history.map((item, index) => {
              return (
                <MessageBubble
                  key={index}
                  text={item.split(":")[1] ?? ""}
                  name={item.split(":")[1]}
                  AI={item.split(":")[0] == "Jay" ? true : false}
                  day={day}
                />
              );
            })}
          </ScrollView>
          <View
            style={{
              width: "100%",
              height: 20,
              backgroundColor: "transparent",
            }}
          />
          <View
            style={{
              width: "95%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
            <MyButton
              bgColor={"transparent"}
              width={"15%"}
              height={45}
              borderRadius={30}
              onPress={onPressSend}
            >
              <Ionicons
                name="send-outline"
                color={ColorPalette.Orange}
                size={22}
              />
            </MyButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styleSheet = StyleSheet.create({
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: DEBUG ? "space-between" : "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  screenContainer: {
    marginTop: 10,
    marginBottom: 100,
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },

  descriptionBox: {
    backgroundColor: ColorPalette.lightGrey + "85",
    fontSize: 16,
    fontFamily: Fonts.Regular,
    borderColor: ColorPalette.DarkGrey + 50,
    borderWidth: 1,
    height: "100%",
    paddingHorizontal: 10,
    textAlignVertical: "center",
    textAlign: "left",
    borderRadius: 10,
    width: "80%",
  },
  chatBubbleContainer: {
    maxWidth: "70%",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  chatMessage: {
    fontFamily: Fonts.Medium,
    fontSize: 16,
    margin: 10,
    textAlign: "left",
  },
});
