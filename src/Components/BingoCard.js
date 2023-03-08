import React, { useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { start } from "./Confetti";

function Confetti() {
  useEffect(() => {
    start();
  });
  return <canvas id="canvas" />;
}

function Tile({ id, children, onToggle, isSet }) {
  return (
    <Text style ={styles.tile} onClick={onToggle} className={`tile ${isSet ? "tile--set" : ""}`}>
      {children}
    </Text>
  );
}

const BingoGame = () => {
  const [bingoCard, setBingoCard] = useState([]);

  const [state, setState] = useState({ checked: {} });
  const isWon = checked => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
        range.find(row => range.every(column => checked[row * 5 + column])) ||
      undefined !==
        range.find(column => range.every(row => checked[row * 5 + column])) ||
        range.every(index => checked[index * 5 + index]) ||
        range.every(index => checked[index * 5 + 4 - index])
    );
  };
  const toggle = index =>
    setState(state => {
      const checked = { ...state.checked, [index]: !state.checked[index] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

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

  const generateCard = () => {
    let tempCard = [];
    const valueKeys = Object.keys(values);
    while (tempCard.length < 25) {
      const randomIndex = Math.floor(Math.random() * valueKeys.length);
      const randomValueKey = valueKeys[randomIndex];
      if (!tempCard.includes(values[randomValueKey])) {
        tempCard.push(values[randomValueKey]);
      }
    }
    setBingoCard(tempCard);
  };

  return (
    <View style={styles.container}>
        <Button title="Generate Card" onPress={generateCard} />

        <View style={styles.card}>
        {bingoCard.map((value, index) => (
            <View key={index} style={styles.box}>
                <Text
                style={styles.number}
                id={index}
                isSet={!!state.checked[index]}
                onToggle={() => toggle(index)}
                >
                    {value}
                </Text>
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
      width: 375,
      height: 375,
      borderWidth: .5,
      borderColor: 'black',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    box: {
      width: '20%',
      height: '20%',
      borderWidth: .5,
      padding: 2,
      borderColor: 'black',
      alignItems: 'center',
      justifyContent: 'center'
    },
    number: {
      fontSize: 9,
      fontWeight: 'bold'
    }
});

export default BingoGame;