import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const MemberCard = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card style={{ marginTop: 20, padding: 10 }}>
        <Card.Title
          title={props.member.email}
          subtitle={props.transparent ? props.member.attending : null}
          left={LeftContent}
        />
      </Card>
    </TouchableOpacity>
  );
};

export default MemberCard;
