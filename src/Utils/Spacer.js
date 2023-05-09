import { View } from "react-native";

export default SeparatorComponent = (props) => {
  return (
    <View
      style={{ width: "100%", height: props.space ? props.space : 1 }}
    ></View>
  );
};
