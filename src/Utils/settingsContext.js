import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { keys } from "./asyncstorageKeys";

export const SettingsContext = createContext(null);

export const SettingsProvider = (props) => {
  const [debug, setDebug] = useState(false);
  const [darkmode, setDarkmode] = useState(true);

  async function loadSettings() {
    const settings = JSON.parse(await AsyncStorage.getItem(keys.settings));
    setDebug(settings?.debug);
    setDarkmode(settings?.darkmode);
  }

  async function saveSettings() {
    const settings = {
      darkmode: darkmode,
      debug: debug,
    };
    AsyncStorage.setItem(keys.settings, JSON.stringify(settings));
  }

  useEffect(() => {
    loadSettings();
    return () => {
      saveSettings();
    };
  }, []);

  return (
    <SettingsContext.Provider
      value={{ debug, darkmode, setDarkmode, setDebug }}
    >
      {props.children}
    </SettingsContext.Provider>
  );
};
