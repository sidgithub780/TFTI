import React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { View } from "react-native";

const LeftContentGreen = (props) => (
  <Avatar.Icon {...props} icon="folder" color="white" backgroundColor="green" />
);

const LeftContentRed = (props) => (
  <Avatar.Icon {...props} icon="folder" color="white" backgroundColor="red" />
);
const LeftContentYellow = (props) => (
  <Avatar.Icon
    {...props}
    icon="folder"
    color="white"
    backgroundColor="#ECCD4B"
  />
);

const MyComponent = (props) => (
  <Card
    mode="outlined"
    style={{
      marginTop: 15,
      shadowColor: "black",
      shadowOpacity: 0.25,
      shadowOffset: {
        width: 0,
        height: 10,
      },
    }}
  >
    {props.event.members.map((member) => {
      if (member.email === props.user.email) {
        if (member.attending === "attending") {
          return (
            <Card.Title
              title={props.event?.title}
              subtitle={props.event?.location}
              left={LeftContentGreen}
              style={{ fontFamily: "Axiforma-Regular" }}
            />
          );
        } else if (member.attending === "not attending") {
          return (
            <Card.Title
              title={props.event?.title}
              subtitle={props.event?.location}
              left={LeftContentRed}
              style={{ fontFamily: "Axiforma-Regular" }}
            />
          );
        } else {
          return (
            <Card.Title
              title={props.event?.title}
              subtitle={props.event?.location}
              left={LeftContentYellow}
              style={{ fontFamily: "Axiforma-Regular" }}
            />
          );
        }
      }
    })}

    <Card.Content>
      <Title style={{ fontFamily: "Axiforma-Regular", fontSize: 15 }}>
        {props.event?.description}
      </Title>
      <Title style={{ fontSize: 15 }}>
        {new Date(props.event.startDate.seconds * 1000).toLocaleDateString(
          "en-US"
        )}
        {"  "}
        {new Date(props.event.startDate.seconds * 1000).toLocaleTimeString(
          "en-US"
        )}
      </Title>
      {props.event.members.map((member) => {
        if (member.email === props.user.email) {
          if (member.attending === "attending") {
            return (
              <View style={{ flexDirection: "row" }}>
                <Title
                  style={{
                    fontFamily: "Axiforma-Regular",
                    fontSize: 20,
                    marginRight: 10,
                  }}
                >
                  status:
                </Title>
                <Title
                  style={{
                    fontFamily: "Axiforma-Regular",
                    fontSize: 20,
                    color: "green",
                  }}
                >
                  {member.attending}
                </Title>
              </View>
            );
          } else if (member.attending === "not attending") {
            return (
              <View style={{ flexDirection: "row" }}>
                <Title
                  style={{
                    fontFamily: "Axiforma-Regular",
                    fontSize: 20,
                    marginRight: 10,
                  }}
                >
                  status:
                </Title>
                <Title
                  style={{
                    fontFamily: "Axiforma-Regular",
                    fontSize: 20,
                    color: "red",
                  }}
                >
                  {member.attending}
                </Title>
              </View>
            );
          } else {
            return (
              <View style={{ flexDirection: "row" }}>
                <Title
                  style={{
                    fontFamily: "Axiforma-Regular",
                    fontSize: 20,
                    marginRight: 10,
                  }}
                >
                  status:
                </Title>
                <Title
                  style={{
                    fontFamily: "Axiforma-Regular",
                    fontSize: 20,
                    color: "#ECCD4B",
                  }}
                >
                  {member.attending}
                </Title>
              </View>
            );
          }
        }
      })}
    </Card.Content>
  </Card>
);

export default MyComponent;
