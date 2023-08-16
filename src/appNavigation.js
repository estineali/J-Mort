import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./Views/StartScreen";
import ChatScreen from "./Views/chatScreen";

const NavStack = createNativeStackNavigator();

export default Screens = () => {
  return (
    <NavStack.Navigator
      initialRouteName="splash-screen"
      screenOptions={{ headerShown: false }}
    >
      <NavStack.Screen name="splash-screen" component={SplashScreen} />
      <NavStack.Screen name="chat-screen" component={ChatScreen} />
    </NavStack.Navigator>
  );
};
