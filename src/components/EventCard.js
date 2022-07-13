import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { TouchableOpacity } from "react-native";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const MyComponent = (props) => (
  <TouchableOpacity>
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
      <Card.Title
        title={props.event.title}
        subtitle={props.event.description}
        left={LeftContent}
        style={{ fontFamily: "Axiforma-Regular" }}
      />
      <Card.Content>
        <Title style={{ fontFamily: "Axiforma-Regular", fontSize: 15 }}>
          attending: {props.event.attending}
        </Title>
        <Title style={{ fontFamily: "Axiforma-Regular", fontSize: 15 }}>
          not attending: {props.event.notAttending}
        </Title>
      </Card.Content>
      <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
    </Card>
  </TouchableOpacity>
);

export default MyComponent;
