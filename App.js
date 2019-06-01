import React from 'react';
import { StyleSheet, Text, View , TextInput, Button } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    // this.state = { players: [{name: 'Dima', sum: 0}, {name: 'Zhenya', sum: 0}], name: '', currentPlayerIndex: 0, points: null };
    this.state = { players: [], name: '', currentPlayerIndex: null, points: 50 };
  }

  addPlayer = (event) => {
    const player = { name:event.nativeEvent.text, sum:0 }
    this.setState({players:[...this.state.players, player], name:''})
  }

  nextPlayer = (event) => {
    const toAdd = parseInt(event.nativeEvent.text);
    // debugger
    const newIndex = (this.state.currentPlayerIndex + 1) % this.state.players.length;
    this.setState({currentPlayerIndex: newIndex, players: this.newPlayers(toAdd), points: null});

  }

  newPlayers = (toAdd) => {
    var newPlayers = this.state.players.slice(0);
    newPlayers[this.state.currentPlayerIndex].sum += toAdd
    return newPlayers;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.players.map((player, index) => {
          const currentPlayer = (index === this.state.currentPlayerIndex)
          return <View key={index}>
            <Text style={currentPlayer ? {fontWeight:'bold', fontSize:60} : {fontSize:30}}>
              {player.name} ({player.sum})
            </Text>
          </View>
        })}
        <View style={{ height: 40 }}/>
        {this.state.currentPlayerIndex === null ? (
          <View>
            <TextInput
              value={this.state.name}
              onChangeText={ (name) => this.setState({ name }) }
              style={styles.input}
              onSubmitEditing={ this.addPlayer }
              />
              <View style={{ height: 40 }}/>
            <Button
              style={styles.button}
              title='Start'
              onPress={() => this.setState({currentPlayerIndex:0})}
            />
          </View>
        ) :
          <TextInput
            autoFocus
            key={this.state.currentPlayerIndex}
            keyboardType='numeric'
            value={this.state.points}
            onChangeText={ (points) => this.setState({ points }) }
            style={styles.input}
            onSubmitEditing={ this.nextPlayer }
          />
       }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    height: 80,
    width: 150,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    fontSize:35,
  },
  button: {
    width: 150,
  },
});
