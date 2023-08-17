import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";

import {
  useFonts,
  Urbanist_100Thin,
  Urbanist_200ExtraLight,
  Urbanist_300Light,
  Urbanist_400Regular,
  Urbanist_500Medium,
  Urbanist_600SemiBold,
  Urbanist_700Bold,
  Urbanist_800ExtraBold,
  Urbanist_900Black,
  Urbanist_100Thin_Italic,
  Urbanist_200ExtraLight_Italic,
  Urbanist_300Light_Italic,
  Urbanist_400Regular_Italic,
  Urbanist_500Medium_Italic,
  Urbanist_600SemiBold_Italic,
  Urbanist_700Bold_Italic,
  Urbanist_800ExtraBold_Italic,
  Urbanist_900Black_Italic,
} from "@expo-google-fonts/urbanist";

import Screens from "./src/appNavigation";
import { SettingsProvider } from "./src/Utils/settingsContext";
export default function App() {
  let [fontsLoaded] = useFonts({
    Urbanist_100Thin,
    Urbanist_200ExtraLight,
    Urbanist_300Light,
    Urbanist_400Regular,
    Urbanist_500Medium,
    Urbanist_600SemiBold,
    Urbanist_700Bold,
    Urbanist_800ExtraBold,
    Urbanist_900Black,
    Urbanist_100Thin_Italic,
    Urbanist_200ExtraLight_Italic,
    Urbanist_300Light_Italic,
    Urbanist_400Regular_Italic,
    Urbanist_500Medium_Italic,
    Urbanist_600SemiBold_Italic,
    Urbanist_700Bold_Italic,
    Urbanist_800ExtraBold_Italic,
    Urbanist_900Black_Italic,
  });
  if (!fontsLoaded) {
    // Refactor: Replace with splash screen
    return <AppLoading />;
  }

  return (
    <SettingsProvider>
      <NavigationContainer>
        <Screens />
      </NavigationContainer>
    </SettingsProvider>
  );
}
