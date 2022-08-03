import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Avatar, Button, Card } from "react-native-paper";

import Screen from "../components/Screen";

import MemberCard from "../components/MemberCard";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const EventMembersScreen = ({ route, navigation }) => {
  return (
    <Screen>
      <Text
        style={{
          fontFamily: "Axiforma-Bold",
          fontSize: 25,
        }}
      >
        members
      </Text>

      {route.params.event.members.map((member) => {
        return (
          <MemberCard
            member={member}
            transparent={route.params.event.transparent}
            onPress={() => {
              navigation.navigate("View Profile", {
                member: member,
                event: route.params.event,
              });
            }}
          />
        );
      })}
    </Screen>
  );
};

export default EventMembersScreen;

const styles = StyleSheet.create({});
