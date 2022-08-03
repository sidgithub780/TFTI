import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useContext } from "react";

import Screen from "../components/Screen";

import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

import { Button } from "react-native-paper";

import AccountNavigator from "../components/AccountNavigator";

import Constants from "expo-constants";

import { userFromDBContext } from "../context/Context";

const AccountChangeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { userFromDB1 } = useContext(userFromDBContext);
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
          edit account
        </Text>
        <AccountNavigator
          titleText="name"
          onPress={() => {
            navigation.navigate("Name Change");
          }}
          iconName="person"
          arrowVal={userFromDB1.firstName + " " + userFromDB1.lastName}
        />
        <AccountNavigator
          titleText="bio"
          onPress={() => {
            navigation.navigate("Note Change");
          }}
          iconName="document-outline"
          arrowVal="..."
        />
        <AccountNavigator
          titleText="socials"
          onPress={() => {
            navigation.navigate("Social Change");
          }}
          iconName="share-social-outline"
        />
      </View>
      <View>
        <Button
          mode="contained"
          color="black"
          loading={loading}
          style={{ marginBottom: 25 }}
          uppercase={false}
          onPress={async () => {
            setLoading(true);
            await signOut(auth);
            console.log("logged out");
            setLoading(false);
            navigation.navigate("Landing Screen");
          }}
        >
          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
            sign out
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default AccountChangeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop:
      Constants.statusBarHeight + Dimensions.get("window").height / 15,
    marginHorizontal: Dimensions.get("window").width / 12.5,
    flex: 1,
    justifyContent: "space-between",
  },
});
