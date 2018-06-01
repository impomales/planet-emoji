import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
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
      score: 0
    };
    this.restartGame = this.restartGame.bind(this);
    this.pickRandomQuestion = this.pickRandomQuestion.bind(this);
  }

  componentDidMount() {
    this.restartGame();
  }

  restartGame() {
    const emojisArr = emojis.slice();
    const randomQuestion = this.pickRandomQuestion(emojisArr);
    this.setState({ emojis: emojisArr, randomQuestion, score: 0 });
  }

  pickRandomQuestion(arr) {
    return Math.floor(arr.length * Math.random());
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.emojis.map((emoji, index) => (
          <Text key={index}>{emoji.question}</Text>
        ))}
        <Text>SCORE: {this.state.score}</Text>
      </View>
    );
  }
}

export default Game;
