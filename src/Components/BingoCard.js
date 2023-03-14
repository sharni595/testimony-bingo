import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Canvas from 'react-native-canvas';
import { Start } from "./Confetti";


const BingoGame = () => {
  const values = {
    1: '"I know the church is true"',
    2: '"I would be truly remiss/ungrateful..."',
    3: 'TMI',
    4: 'Member of bishopric falls asleep',
    5: 'Race for first place',
    6: 'Unaccompanied minor',
    7: 'Accompanied minor(influenced by parent)',
    8: 'The Arrangement; "I will if you will"',
    9: '"...fiber of my being..."',
    10: 'Name Dropping',
    11: 'Bad joke(doesnt hit, followed by brief silence)',
    12: 'Good joke(hits well, people laugh)',
    13: '"I say these things in the name of THY son"',
    14: 'The Regular(goes up every time without fail)',
    15: '30+ seconds of silence',
    16: 'Elaborate metaphor or movie comparison',
    17: '"On MY mission"',
    18: 'RM testifying in their mission language',
    19: 'Travelogue',
    20: 'Long talker(goes over 7 minutes)',
    21: 'The ugly cry',
    22: 'The visitor(not their ward, but feels impressed to go up)',
    23: 'Accidentallly swears',
    24: 'Intentionally swears',
    25: 'Passively calls someone out(no mention of names but we all know)',
    26: 'No actual testimony, just stories',
    27: 'Inappropriate call to repentance',
    28: 'COVID-19',
    29: 'Thankimony',
    30: 'Too close to the mic',
    31: '"This will be quick..."(This wont be quick)',
    32: 'Shout out to their partner',
    33: 'Unprovoked singing',
    34: '"I didnt plan on getting up here today..."'
  };
  const ref = React.useRef(null);
  const [board, setBoard] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [winner, setWinner] = useState(false);

  //CHECK FOR WINS
  useEffect(() => {
    // Check rows
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      const row = board[rowIndex];
      let allSelected = true;

      for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
        const cellId = `${rowIndex}-${cellIndex}`;

        if (!selectedCells.has(cellId)) {
          setWinner(false);
          allSelected = false;
          break;
        }
      }

      if (allSelected) {
        setWinner(true);
        return;
      }
    }

    // Check columns
    for (let cellIndex = 0; cellIndex < board[0].length; cellIndex++) {
      let allSelected = true;

      for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        const cellId = `${rowIndex}-${cellIndex}`;

        if (!selectedCells.has(cellId)) {
          setWinner(false);
          allSelected = false;
          break;
        }
      }

      if (allSelected) {
        setWinner(true);
        return;
      }
    }

    // Check diagonals
    let diagonal1AllSelected = true;
    let diagonal2AllSelected = true;

    for (let i = 0; i < board.length; i++) {
      const diagonal1CellId = `${i}-${i}`;
      const diagonal2CellId = `${i}-${board.length - i - 1}`;

      if (!selectedCells.has(diagonal1CellId)) {
        setWinner(false);
        diagonal1AllSelected = false;
      }

      if (!selectedCells.has(diagonal2CellId)) {
        setWinner(false);
        diagonal2AllSelected = false;
      }
    }

    if (diagonal1AllSelected) {
      setWinner(true);
      return;
    }

    if (diagonal2AllSelected) {
      setWinner(true);
      return;
    }

  }, [selectedCells]);

  //GENERATE BINGO CARD
  const generateCard = () => {
    setWinner(false)
    setSelectedCells(new Set())
    const usedNumbers = new Set();
    const newBoard = [];
    const valueKeys = Object.keys(values);
    for (let i = 0; i < 5; i++) {
      const newRow = [];
      for (let j = 1; j < 6; j++) {
        let randomIndex = Math.ceil(Math.random() * valueKeys.length);

        // Ensure that each number is unique on the board
        while (usedNumbers.has(randomIndex)) {
          randomIndex = Math.ceil(Math.random() * valueKeys.length);
        }
        
        usedNumbers.add(randomIndex);
        newRow.push(values[randomIndex]);
      }
      newBoard.push(newRow);
    }
    // Replace the center cell with a free space
    newBoard[2][2] = 'Free Space';
    setBoard(newBoard);
  }
  //TOGGLE COLOR AND BINGO ON CELLS
  const toggleCell = (row, col) => {
    const cellId = `${row}-${col}`;
    const updatedSelectedCells = new Set(selectedCells);
    //toggle color
    if (selectedCells.has(cellId)) {
      updatedSelectedCells.delete(cellId);
    } else {
      updatedSelectedCells.add(cellId);
    }
    setSelectedCells(updatedSelectedCells);
  }

  return (
    <View style={styles.container}>
      {winner ? (
        <Text style={styles.result}>Bingo! You won!</Text>
      ) : (
        <Text style={styles.result}>Keep playing!</Text>
      )} 
      <Button title="New Bingo Card" onPress={generateCard} />
      <View style={styles.card}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.box} >
            {row.map((cell, cellIndex) => {
              const isSelected = selectedCells.has(`${rowIndex}-${cellIndex}`);
              const backgroundColor = isSelected ? styles.circle : '#ffffff';
              return (
                <TouchableOpacity key={`${rowIndex}-${cellIndex}`} style={styles.tile} onPress={() => toggleCell(rowIndex, cellIndex)}>
                  <View style={isSelected ? styles.circle : '#ffffff'}></View>
                  <Text adjustsFontSizeToFit={true} style={styles.number}>{cell}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))} 
      </View> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 380,
    height: 380,
    flexWrap: 'wrap',
  },
  tile: {
    width: 75,
    height: '20%',
    borderWidth: .5,
    borderColor: 'black',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 2,
    margin: .75,
    justifyContent: 'center',
    alignItems: 'center'
  },
  number: {
    fontSize: 9.5,
    textAlign: 'center',
  },
  circle: {
    position:'absolute',
    borderWidth: 1,
    borderColor: 'rgba(192, 215, 187,0.5)',
    borderRadius: 50,
    backgroundColor: 'rgba(192, 215, 187,0.5)',
    width: 60,
    height: 60,
    textAlign: 'center',
    lineHeight:100
}
});

export default BingoGame;
