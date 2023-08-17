import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./Views/SplashScreen";
import ChatsHomepage from "./Views/ChatsHomepage";
import ChatScreen from "./Views/ChatScreen";
import SettingsScreen from "./Views/SettingsScreen";
import NewChatsScreen from "./Views/NewChatsScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keys } from "./Utils/asyncstorageKeys";

const NavStack = createNativeStackNavigator();

export default Screens = () => {
  const [initRoute, setInitRoute] = useState("splash-screen");

  async function loadAuth() {
    const userName = await AsyncStorage.getItem(keys.userName);
    
    console.log("DEBUG:username is " + userName);
    if (userName) {
      setInitRoute("homepage-chats-index");
    }
  }

  useEffect(() => {
    loadAuth();
  }, []);

  return (
    <NavStack.Navigator
      initialRouteName={initRoute}
      screenOptions={{ headerShown: false }}
    >
      <NavStack.Screen name="splash-screen" component={SplashScreen} />
      <NavStack.Screen name="homepage-chats-index" component={ChatsHomepage} />
      <NavStack.Screen name="chat-screen" component={ChatScreen} />
      <NavStack.Screen name="new-chats-screen" component={NewChatsScreen} />
      <NavStack.Screen name="settings-screen" component={SettingsScreen} />
    </NavStack.Navigator>
  );
};
