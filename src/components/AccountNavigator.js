import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AccountNavigator = (props) => {
  return (
    <TouchableOpacity style={styles.touchableStyle} onPress={props.onPress}>
      <View style={styles.rowStyle}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name={props.iconName} size={15} />
          <Text style={{ marginLeft: 5, fontFamily: "Axiforma-Regular" }}>
            {props.titleText}
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" />
      </View>
    </TouchableOpacity>
  );
};

export default AccountNavigator;

const styles = StyleSheet.create({
  rowStyle: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "black",
  },
  touchableStyle: { marginVertical: 10 },
});
