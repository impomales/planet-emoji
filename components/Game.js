import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { StackNavigator } from "react-navigation";
import { emojis } from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#AAA",
    justifyContent: "center"
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
      <View style={styles.container}>
        <Text>{message}</Text>
        <Text>SCORE: {score}</Text>
        {this.state.isActive && (
          <View>
            {emojis.length && <Text>{emojis[randomQuestion].question}</Text>}
            <TextInput
              onChangeText={this.handleChange}
              value={this.state.guess}
              placeholder="Guess the Phrase!"
            />

            <Button onPress={this.checkGuess} title="Guess!" />
          </View>
        )}
        <Button onPress={this.restartGame} title="New Game" />
      </View>
    );
  }
}

export default Game;
