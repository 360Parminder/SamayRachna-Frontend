import React, { useState } from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import GlobalColors from "../Styles/GlobalColors";

const InputGroup = ({
  label,
  value,
  onChangeText,
  style,
  inputStyle,
  labelStyle,
  containerStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.inputGroup, containerStyle]}>
      <TextInput
        style={[
          styles.input,
          isFocused || value ? styles.inputFocused : null,
          inputStyle, isFocused||value?{zIndex: 0,}:{zIndex: 1}
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={onChangeText}
        placeholder=" " // Space for the floating label
      />
      <Text
        style={[
          styles.label,
          isFocused || value ? styles.labelFocused : null,
          labelStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginVertical: 10,
    position: "relative",
    alignSelf: "center",
    width: "100%",
  },
  input: {
    position: "relative",
    color: GlobalColors.text,
    fontSize: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: GlobalColors.border,
    borderRadius: 20,
    backgroundColor: "transparent",
    width: "100%",

  },
  label: {
    position: "absolute",
    left: 16,
    paddingHorizontal: 4,
    color: GlobalColors.text,
    fontSize: 16,
    // backgroundColor: ,
    transform: [{ translateY: 16 }],
  },
  inputFocused: {
    borderColor: "rgb(150, 150, 200)",
  },
  labelFocused: {
    transform: [{ translateY: -10 }],
    fontSize: 16,
    color: GlobalColors.text,
    backgroundColor: GlobalColors.background,
    paddingHorizontal: 4,

  },
});

export default InputGroup;
