import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import ColorPalette from "../Utils/ColorPalette";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fonts from "../Utils/Fonts";
import { MyButton } from "../Utils/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { ResolveRequest } from "../Utils/serverutils";
import OPENAI_KEY from "../openaikey";
import PROMPTS from "../prompts";
import { StatusBar } from "expo-status-bar";
import Header from "../Utils/Header";
import { keys } from "../Utils/asyncstorageKeys";
import { OPENAI_URL } from "../openaikey";

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
          color:
            props.AI && props.day >= 4 && props.day <= 7 ? "white" : "black",
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};

const TopBar = (props) => {
  return (
    <Pressable
      onPress={DEBUG ? props.onNextDay : null}
      onLongPress={DEBUG ? props.onPreviousDay : null}
      delayLongPress={300}
      style={styleSheet.topBar}
    >
      <Text
        style={{
          fontFamily: Fonts.Bold,
          fontSize: 18,
          color: ColorPalette.white,
        }}
      >
        Day {props.day ?? 1}
      </Text>
    </Pressable>
  );
};
export default ChatScreen = (props) => {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [day, setDay] = useState(1);

  useEffect(() => {
    GetHistory();
  }, []);

  useEffect(() => {
    // save history to async storage
    SaveHistory();
    showHistory();
  }, [history]);

  async function GetHistory() {
    setHistory(JSON.parse(await AsyncStorage.getItem(keys.chatHistory)) ?? []);
  }
  async function SaveHistory() {
    await AsyncStorage.setItem(keys.chatHistory, JSON.stringify(history));
  }

  function backHandler() {
    props.navigation.goBack();
  }

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
    let hist = "";
    history.forEach((element) => {
      hist += element.name + ": " + element.message.trim() + "\n";
    });
  }

  function showHistory() {
    if (DEBUG) {
      console.log([...history]);
      console.log("\n");
    }
  }

  async function onPressSend() {
    const AIInitialDescription = PROMPTS[day];
    const AIChatHistory = parseHistory();
    const LatestMessage = { name: "User", message: message, day: day };

    const AISample =
      "A sample conversation is bellow: \nUser: Hello!\nJM: Hey there, I am Jay.\nUser: Hi Jay, How are you doing today?\nJay: I've seen better days, how are you?\n\nNow continue conversation based only on the messages that follow now.\n\n";

    // prompt ending - prevents user's sentence completion
    const promptEnding = "\nJay:";

    setHistory([...history, LatestMessage]);

    // Send to Open AI
    let compiledPrompt = AIInitialDescription + AISample + AIChatHistory;
    compiledPrompt += LatestMessage.name + ": " + LatestMessage.message + "\n";

    compiledPrompt += promptEnding;

    const config = {
      model: "text-davinci-003",
      prompt: compiledPrompt,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    //Reset message
    setMessage("");

    if (day != 10) {
      if (day == 11) {
        config.prompt = AIChatHistory + AIInitialDescription;
        config.max_tokens = 512;
      }
      const result = await ResolveRequest({
        token: OPENAI_KEY,
        method: "POST",
        url: OPENAI_URL,
        body: config,
      });

      const AIResponse = {
        name: "Jay",
        message: result.choices[0].text.trim(),
        day: day,
      };
      setHistory([...history, LatestMessage, AIResponse]);
      if (DEBUG) {
        console.log("DEBUG:: " + result.choices[0].text);
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ColorPalette.black }}>
      <StatusBar hidden backgroundColor="transparent"/>
      <Header back={backHandler} title={"Jay Mort"} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
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
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            snapToEnd={true}
          >
            {history.map((item, index) => {
              return (
                <MessageBubble
                  key={index}
                  text={item.message}
                  name={item.name}
                  AI={item.name == "Jay" ? true : false}
                  day={day}
                />
              );
            })}
          </ScrollView>
          <View style={styleSheet.messagebar}>
            <TextInput
              style={styleSheet.messageInputBox}
              selectionColor={ColorPalette.Blue}
              color={ColorPalette.white}
              placeholder={"New Message"}
              placeholderTextColor={ColorPalette.white + 80}
              maxLength={MESSAGE_LENGTH_LIMIT}
              value={message}
              onChangeText={(text) => {
                setMessage(text);
              }}
            />
            <MyButton
              bgColor={"transparent"}
              width={45}
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  screenContainer: {
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: ColorPalette.black,
  },

  messageInputBox: {
    backgroundColor: ColorPalette.black,
    fontSize: 16,
    fontFamily: Fonts.SemiBold,
    height: "100%",
    alignItems: "center",
    alignContent: "center",
    textAlign: "left",
    borderRadius: 0,
    width: "90%",
  },
  chatBubbleContainer: {
    maxWidth: "70%",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  chatMessage: {
    fontFamily: Fonts.Medium,
    fontSize: 16,
    margin: 10,
    textAlign: "left",
  },
  messagebar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: ColorPalette.black,
    marginHorizontal: 10,
  },
});
