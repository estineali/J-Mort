//Packages
import React from "react";
import { TouchableOpacity, Keyboard, Platform } from "react-native";
import ColorPalette from "./ColorPalette";

export const MyButtonListener = (props) => {

    const [showBar, setShowBar] = React.useState(true)

    React.useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    
        // cleanup function
        return () => {
          Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
          Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
      }, []);
    
      const _keyboardDidShow = () => {
        setShowBar(false)
      };
    
      const _keyboardDidHide = () => {
        setShowBar(true)
      };


    return (
        <TouchableOpacity
            onPress={(event) => { event.preventDefault(); props.onPress() }}
            style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center',
                alignItems: "center",
                backgroundColor: props.bgColor === "transparent" ? ColorPalette.White : props.bgColor,
                borderRadius: props.borderRadius ? props.borderRadius : 8,
                width: props.width ? props.width : 100,
                height: props.height ? props.height : 50,
                borderWidth: props.borderColor ? 2 : 0,
                borderColor: props.borderColor ? props.borderColor : "#transparent",
                shadowColor: ColorPalette.Black,
                shadowOpacity: 0.3,
                shadowOffset: {height: 3, width: 0},
                elevation: 2,
                ...props.customStyles,
                marginBottom: showBar ? ( Platform.OS == "android" ? 100 : 70) : 0
            }}
        >
            {props.children}
        </TouchableOpacity>

    );
};

export const MyButton = (props) => {

    return (
        <TouchableOpacity
            onPress={(event) => { event.preventDefault(); props.onPress() }}
            style={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center',
                alignItems: "center",
                alignSelf: 'center',
                backgroundColor: props.bgColor === "transparent" ? ColorPalette.Background_Lightmode : props.bgColor,
                borderRadius: props.borderRadius ? props.borderRadius : 0,
                width: props.width ? props.width : 100,
                height: props.height ? props.height : 50,
                borderWidth: props.borderColor ? 2 : 0,
                borderColor: props.borderColor ? props.borderColor : "transparent",
                ...props.customStyles
            }}
        >
            {props.children}
        </TouchableOpacity>

    );
};