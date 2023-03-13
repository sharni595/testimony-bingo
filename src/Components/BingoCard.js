import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { start } from "./Confetti";

function Confetti() {
  useEffect(() => {
    start();
  });
  return <canvas id="canvas" />;
}

// function Tile({ id, children, onToggle, isSet }) {
//   return (
//     <Text style ={styles.tile} onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
//       {children}
//     </Text>
//   );
// }

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

  const [board, setBoard] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);
  const [color, setColor] = useState({});
  const [winner, setWinner] = useState(false);

    const checkWinner = () => {
    // Check rows
    for (let i = 0; i < 5; i++) {
      if (board[i][0] && board[i][0][0] === board[i][1][0] && board[i][1][0] === board[i][2][0] && board[i][2][0] === board[i][3][0] && board[i][3][0] === board[i][4][0]) {
        setWinner(true);
        return;
      }
    }

    // Check columns
    for (let i = 0; i < 5; i++) {
      if (board[0][i] && board[0][i][0] === board[1][i][0] && board[1][i][0] === board[2][i][0] && board[2][i][0] === board[3][i][0] && board[3][i][0] === board[4][i][0]) {
        setWinner(true);
        return;
      }
    }

    // Check diagonal from top-left to bottom-right
    if (board[0][0] && board[0][0][0] === board[1][1][0] && board[1][1][0] === board[2][2][0] && board[2][2][0] === board[3][3][0] && board[3][3][0] === board[4][4][0]) {
      setWinner(true);
      return;
    }

    // Check diagonal from top-right to bottom-left
    if (board[0][4] && board[0][4][0] === board[1][3][0] && board[1][3][0] === board[2][2][0] && board[2][2][0] === board[3][1][0] && board[3][1][0] === board[4][0][0]) {
      setWinner(true);
      return;
    }
  }


  const generateCard = () => {
    setWinner(false)
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
        if (values[randomIndex] == undefined) {
          
          console.log(values[randomIndex])
          console.log(randomIndex)
        }
        newRow.push(values[randomIndex]);
      }

      newBoard.push(newRow);
    }
      // Replace the center cell with a free space
      newBoard[2][2] = 'Free Space';
      setBoard(newBoard);
    }

  const toggleCell = (row, col) => {
    if (board[row][col][0] != 'X') {
      const newBoard = [...board];
      newBoard[row][col] = 'X' + newBoard[row][col];
      setBoard(newBoard);
      // setColor(prevState => {
      //   return {
      //     ...prevState,
      //     [row]: prevState[row] === 'red' ? 'white' : 'red'
      //   }
      // });
      checkWinner();
    }
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
            {row.map((cell, cellIndex) => (
              <TouchableOpacity key={`${rowIndex}-${cellIndex}`} style={styles.tile} onPress={() => toggleCell(rowIndex, cellIndex)}>
                <Text style={styles.number}>{cell}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))} 
      </View> 
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: 380,
    height: 380,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  box: {
    width: '20%',
    alignItems: 'center',
    padding: 2,
    justifyContent: 'center'
  },
  tile: {
    width: 75,
    height: '20%',
    borderWidth: .5,
    borderColor: 'black',
    padding: 2
  },
  number: {
    fontSize: 9,
    fontWeight: 'bold'
  }
});

export default BingoGame;
