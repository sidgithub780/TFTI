import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const ChooseEventLocation = ({ navigation, route }) => {
  return (
    <Screen>
      <Text
        style={{ fontFamily: "Axiforma-Bold", fontSize: 25, marginBottom: 10 }}
      >
        choose event location
      </Text>
      <View style={{ height: "100%" }}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            route.params.onGoBack(data.description);
            navigation.goBack();
            console.log(data, details);
            //setEventLocation(data.description);
          }}
          query={{
            key: "AIzaSyCjFx3bl1QEtoFoVF1zs0asjwDyKpuPJCI",
            language: "en",
          }}
        />
      </View>
    </Screen>
  );
};

export default ChooseEventLocation;

const styles = StyleSheet.create({});
