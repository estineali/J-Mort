import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./Views/SplashScreen";
import ChatsHomepage from "./Views/ChatsHomepage";
import ChatScreen from "./Views/ChatScreen";

const NavStack = createNativeStackNavigator();

export default Screens = () => {
  return (
    <NavStack.Navigator
      initialRouteName="splash-screen"
      screenOptions={{ headerShown: false }}
    >
      <NavStack.Screen name="splash-screen" component={SplashScreen} />
      <NavStack.Screen name="homepage-chats-index" component={ChatsHomepage} />
      <NavStack.Screen name="chat-screen" component={ChatScreen} />
    </NavStack.Navigator>
  );
};
