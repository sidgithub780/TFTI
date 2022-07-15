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
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
} from "firebase/auth";

import { collection, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";

import { db } from "../firebase-config";

const SignupScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editable, setEditable] = useState(true);

  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await setDoc(doc(db, "users", signupEmail.toLowerCase()), {
      email: signupEmail.toLowerCase(),
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      note: "",
      password: signupPassword,
      events: [],
    });
  };

  const deleteUserFromDB = async (uid) => {
    await deleteDoc(doc(db, "users", uid));
  };

  const signup = async () => {
    setEditable(false);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      const docRef = createUser();
      console.log("below is docref");
      console.log(docRef);
      await sendEmailVerification(userCredentials.user);
      setLoading(false);
      alert("Please verify your account by pressing the link in your email.");
      setTimeout(async () => {
        await userCredentials.user.reload();
        const user = userCredentials.user;
        console.log("the user that is being judged");
        console.log(user);
        if (user.emailVerified) {
          alert(
            "Account was not deleted. Because it was verified within the time."
          );
        } else {
          console.log("below is user email");
          console.log(user.email);
          await deleteUserFromDB(signupEmail.toLowerCase());
          await deleteUser(user);
          alert("Newly created account has been deleted");
        }
      }, 60 * 1000);
      setEditable(true);
      //navigation.navigate("Home Screen");
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
          editable={editable}
        />

        <TextInput
          mode="outlined"
          label="last name"
          outlineColor="black"
          activeOutlineColor="black"
          left={<TextInput.Icon name="account" />}
          style={{ marginBottom: 15 }}
          onChangeText={(lastName) => setLastName(lastName)}
          editable={editable}
        />

        <TextInput
          mode="outlined"
          label="email"
          outlineColor="black"
          activeOutlineColor="black"
          style={{ marginBottom: 15 }}
          left={<TextInput.Icon name="email" />}
          onChangeText={(signupEmail) => setSignupEmail(signupEmail)}
          editable={editable}
          autoCapitalize="none"
          autoCorrect={false}
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
          editable={editable}
          autoCapitalize="none"
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
