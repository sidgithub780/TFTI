import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native-paper";
import Screen from "../components/Screen";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../firebase-config";
import { ref, uploadBytes } from "firebase/storage";
import uuid from "react-native-uuid";

const PhotoScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.cancelled) {
      setImage(result);
      const storageRef = ref(storage, `${uuid.v4()}.jpg`); //how the image will be addressed inside the storage

      //convert image to array of bytes
      const img = await fetch(result.uri);
      const bytes = await img.blob();

      await uploadBytes(storageRef, bytes); //upload images
      alert("uploaded!");
    }
  };

  /*
  const uploadImage = async (uri) => {
    setUploading(true);
    const response = await fetch(uri);
    const blob = await response.blob();
    const imageRef = ref(storage, "jiit.jpg");
    uploadBytes(imageRef, blob);
    alert("done");
  };

  */
  return (
    <Screen>
      <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 25 }}>photos</Text>
      <Button
        mode="contained"
        color="black"
        uppercase={false}
        style={{ marginTop: 15 }}
        onPress={pickImage}
      >
        <Text style={{ fontFamily: "Axiforma-Bold", fontSize: 20 }}>
          upload image
        </Text>
      </Button>
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{
            width: "100%",
            height: "50%",
            borderRadius: 10,
            marginTop: 15,
            alignSelf: "center",
          }}
        />
      )}
    </Screen>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({});
