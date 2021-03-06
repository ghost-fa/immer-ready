import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity
} from "react-native";
import { Badge } from "react-native-elements";
import { Speech } from "expo";
import { Ionicons, Octicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation";
import showContact from "../Controlers/getContacts";
import _ from "lodash";

export default class GetContact extends Component {
  state = {
    contacts: [],
    index: 0,
    loading: true,
    alpha: 0,
    alphasArray: []
  };

  speakOpt = {
    language: "en",
    pitch: 1.0,
    rate: 0.85,
    onError: () => console.log("error")
  };

  componentDidMount() {
    Speech.speak("press up or down to select a contact!", this.speakOpt);

    showContact().then(contact => {
      const alphasArray = _.uniq(contact.map(item => item.firstChar));
      this.setState({
        contacts: contact,
        loading: false,
        alphasArray: alphasArray,
        alpha: alphasArray[0]
      });
    });
  }

  keyUp = () => {
    Speech.stop();
    Speech.speak("UP", this.speakOpt);
    if (this.state.index === 0) {
      this.setState({
        index: this.state.contacts.length - 1,
        alpha: this.state.contacts[
          this.state.contacts.length - 1
        ].name.charCodeAt(0)
      });
    } else {
      Speech.speak(
        this.state.contacts[this.state.index - 1].name,
        this.speakOpt
      );

      this.setState({
        index: this.state.index - 1,
        alpha: this.state.contacts[this.state.index - 1].name.charCodeAt(0)
      });
    }
  };

  keyLongUp = () => {
    Speech.stop();
    const unicodeArray = this.state.alphasArray;
    let currentIndex = unicodeArray.indexOf(this.state.alpha);
    let factor = currentIndex > 0 ? currentIndex : unicodeArray.length;

    let nextVal = unicodeArray[factor - 1];
    const index = this.state.contacts.findIndex(
      contact => contact.firstChar === nextVal
    );

    this.setState({
      index: index,
      alpha: nextVal
    });
    Speech.speak(
      `Jump to the previous letter ${
        this.state.contacts[this.state.index].name
      }`
    );
  };

  keyDown = () => {
    Speech.stop();
    Speech.speak("down", this.speakOpt);
    if (this.state.index === this.state.contacts.length - 1) {
      this.setState({
        index: 0,
        alpha: this.state.contacts[0].name.charCodeAt(0)
      });
    } else {
      Speech.speak(
        this.state.contacts[this.state.index + 1].name,
        this.speakOpt
      );

      this.setState({
        index: this.state.index + 1,
        alpha: this.state.contacts[this.state.index + 1].name.charCodeAt(0)
      });
    }
  };

  keyLongDown = () => {
    Speech.stop();
    const unicodeArray = this.state.alphasArray;
    let currentIndex = unicodeArray.indexOf(this.state.alpha);
    let nextVal = unicodeArray[currentIndex + 1];

    if (currentIndex === unicodeArray.length - 1) {
      this.setState({
        index: 0,
        alpha: unicodeArray[0]
      });
    } else {
      const index = this.state.contacts.findIndex(
        contact => contact.firstChar === nextVal
      );

      this.setState({
        index: index,
        alpha: nextVal
      });
      Speech.speak(
        `Jump to the next letter ${this.state.contacts[this.state.index].name}`
      );
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.topBottom} >
          <FontAwesome

            accessible={true}
            accessibilityLabel="UP"
            accessibilityHint="click to see the previous number"
            name="caret-up"
            onPress={this.keyUp}
            onLongPress={this.keyLongUp}
            style={styles.upIcon}
          />
        </View>

        <Badge
          containerStyle={{
            backgroundColor: "black"
          }}
          onPress={() => {
            Speech.speak(
              "You selected" + this.state.contacts[this.state.index].name,
              this.speakOpt
            );
            this.props.screenProps.passState(
              this.state.contacts[this.state.index]
            );
            navigate("Home");
          }}
        >
          <Text style={{ fontSize: 25, color:'white' }}>
            {this.state.loading
              ? "loading...."
              : this.state.contacts[this.state.index].name}
          </Text>
          <Text style={{ fontSize: 25, color:'white' }}>
            {this.state.loading
              ? "loading...."
              : this.state.contacts[this.state.index].number}
          </Text>
        </Badge>

        <View style={styles.topBottom}>
          <FontAwesome
            accessible={true}
            accessibilityLabel="Down"
            accessibilityHint="click to see the next number"
            name="caret-down"
            onPress={this.keyDown}
            onLongPress={this.keyLongDown}
            style={styles.downIcon}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  topBottom: {
    height: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  center: {
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    color:'white'
  },
  upIcon: {
    fontSize: 350,
    marginBottom: 35,
    color:'white'

  },
  downIcon: {
    fontSize: 350,
    color:'white'
  }
});
