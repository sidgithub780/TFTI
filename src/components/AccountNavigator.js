import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const limit = (string, limit) => {
  return string.substring(0, limit);
};

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
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontFamily: "Axiforma-Regular", color: "gray" }}>
            {props.arrowVal}
          </Text>
          <Ionicons name="chevron-forward-outline" size={15} />
        </View>
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
