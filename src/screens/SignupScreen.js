import { Button, TextInput } from "react-native-paper";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInputComponent,
  View,
  KeyboardAvoidingView,
} from "react-native";

import Screen from "../components/Screen";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const signup = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      console.log(user);
      setLoading(false);
      navigation.navigate("Home Screen");
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView>
      <Screen>
        <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 40 }}>
          signup
        </Text>

        <TextInput
          mode="outlined"
          label="first name"
          outlineColor="black"
          activeOutlineColor="black"
          left={<TextInput.Icon name="account" />}
          style={{ marginBottom: 15, marginTop: 15 }}
          onChangeText={(firstName) => setFirstName(firstName)}
        />

        <TextInput
          mode="outlined"
          label="last name"
          outlineColor="black"
          activeOutlineColor="black"
          left={<TextInput.Icon name="account" />}
          style={{ marginBottom: 15 }}
          onChangeText={(lastName) => setLastName(lastName)}
        />

        <TextInput
          mode="outlined"
          label="email"
          outlineColor="black"
          activeOutlineColor="black"
          style={{ marginBottom: 15 }}
          left={<TextInput.Icon name="email" />}
          onChangeText={(signupEmail) => setSignupEmail(signupEmail)}
        />

        <TextInput
          mode="outlined"
          label="password"
          outlineColor="black"
          activeOutlineColor="black"
          secureTextEntry={true}
          left={<TextInput.Icon name="eye" />}
          style={{ marginBottom: 15 }}
          onChangeText={(signupPassword) => setSignupPassword(signupPassword)}
        />

        <Button
          mode="contained"
          color="black"
          loading={loading}
          style={{ marginTop: 15 }}
          uppercase={false}
          onPress={async () => {
            setLoading(true);
            await signup();
          }}
        >
          <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
            signup
          </Text>
        </Button>
      </Screen>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: "black",
    fontFamily: "Axiforma-Regular",
    borderRadius: 10,
    padding: 20,
    color: "white",
    marginTop: 15,
  },
});
