import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect } from "react";

import Screen from "../components/Screen";

import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

import Constants from "expo-constants";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const EventOptionsScreen = ({ route }) => {
  useEffect(() => {
    console.log(route.params.user);
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontFamily: "Axiforma-Bold",
            fontSize: 25,
          }}
        >
          {route.params.event.title}
        </Text>
        <Card style={{ marginTop: 20 }}>
          <Card.Title
            title="details"
            subtitle="view title, description, and settings"
            left={LeftContent}
          />
        </Card>
        <Card style={{ marginTop: 20 }}>
          <Card.Title
            title="members"
            subtitle="view members"
            left={LeftContent}
          />
        </Card>
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Axiforma-Bold",
            fontSize: 25,
          }}
        >
          change attendance status
        </Text>
      </View>
    </View>
  );
};

export default EventOptionsScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop:
      Constants.statusBarHeight + Dimensions.get("window").height / 15,
    marginHorizontal: Dimensions.get("window").width / 12.5,
    flex: 1,
    justifyContent: "space-between",
  },
});
