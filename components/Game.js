import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground
} from "react-native";
import { StackNavigator } from "react-navigation";
import { emojis } from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(185, 185, 185, 0.5)"
  },
  gamePlay: {
    borderWidth: 2,
    alignItems: "center",
    margin: 5,
    padding: 20,
    backgroundColor: "rgba(100, 100, 100, 0.6)"
  },
  gameMessage: {
    color: "#fff",
    fontSize: 30,
    margin: 20,
    marginTop: 60
  },
  gameScore: {
    color: "#000",
    fontSize: 20,
    margin: 15,
    marginTop: 50
  },
  backgroundImage: {
    width: null,
    flex: 1,
    alignSelf: "stretch"
  },
  mainText: {
    height: 40,
    width: 250,
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "rgba(30, 30, 30, 0.6)"
  }
});

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emojis: [],
      randomQuestion: 0,
      guess: "",
      message: "",
      score: 0,
      isActive: true
    };
    this.restartGame = this.restartGame.bind(this);
    this.pickRandomQuestion = this.pickRandomQuestion.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkGuess = this.checkGuess.bind(this);
  }

  componentDidMount() {
    this.restartGame();
  }

  handleChange(guess) {
    this.setState({ guess });
  }

  checkGuess() {
    let {
      score,
      message,
      randomQuestion,
      emojis,
      guess,
      isActive
    } = this.state;
    guess = guess.replace(/\W/g, "").toLowerCase();
    const answer = emojis[randomQuestion].answer
      .replace(/\W/g, "")
      .toLowerCase();
    if (guess === answer) {
      score += 10;
      message = "Nice Job!";
      emojis = emojis.filter((emoji, index) => index !== randomQuestion);
      randomQuestion = this.pickRandomQuestion(emojis);
    } else {
      message = "Try Again!";
    }

    if (!emojis.length) {
      message = "You win!";
      isActive = false;
    }
    this.setState({
      guess: "",
      score,
      message,
      randomQuestion,
      emojis,
      isActive
    });
  }

  restartGame() {
    const emojisArr = emojis.slice();
    const randomQuestion = this.pickRandomQuestion(emojisArr);
    this.setState({
      emojis: emojisArr,
      randomQuestion,
      score: 0,
      guess: "",
      message: "",
      isActive: true
    });
  }

  pickRandomQuestion(arr) {
    return Math.floor(arr.length * Math.random());
  }

  render() {
    const { emojis, randomQuestion, score, message } = this.state;
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../assets/globe.png")}
      >
        <View style={styles.container}>
          <Text style={styles.gameMessage}>{message}</Text>
          <Text style={styles.gameScore}>SCORE: {score}</Text>
          {this.state.isActive && (
            <View style={styles.gamePlay}>
              {emojis.length && <Text>{emojis[randomQuestion].question}</Text>}
              <TextInput
                style={styles.mainText}
                onChangeText={this.handleChange}
                value={this.state.guess}
                placeholder="Guess the Phrase!"
                placeholderTextColor="#fff"
              />

              <Button onPress={this.checkGuess} title="Guess!" color="#fff" />
            </View>
          )}
          <View style={styles.gameManager}>
            <Button
              onPress={this.restartGame}
              title="New Game"
              color="#fff"
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Game;
