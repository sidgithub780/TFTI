import React from "react";
import { Avatar, Button, Card } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const MemberCard = (props) => {
  return (
    <Card style={{ marginTop: 20, padding: 10 }}>
      <Card.Title
        title={props.member.email}
        subtitle={props.transparent ? props.member.attending : null}
        left={LeftContent}
      />
    </Card>
  );
};

export default MemberCard;
