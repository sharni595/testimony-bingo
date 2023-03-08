import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Pressable, View, ImageBackground, Headers } from "react-native";
import ReactDOM from "react-dom";
import shuffle from "shuffle-array";

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

const BingoPoints = [
    'FREE SPACE "I know the church is true"',
    '"I would be truly remiss/ungrateful..."',
    'TMI',
    'Member of bishopric falls asleep',
    'Race for first place',
    'Unaccompanied minor',
    'Accompanied minor(influenced by parent)',
    'The Arrangement; "I will if you will"',
    '"...fiber of my being..."',
    'Name Dropping',
    'Bad joke(doesnt hit, followed by brief silence)',
    'Good joke(hits well, people laugh)',
    '"I say these things in the name of THY son"',
    'The Regular(goes up every time without fail)',
    '30+ seconds of silence',
    'Elaborate metaphor or movie comparison',
    '"On MY mission"',
    'RM testifying in their mission language',
    'Travelogue',
    'Long talker(goes over 7 minutes)',
    'The ugly cry',
    'The visitor(not their ward, but feels impressed to go up)',
    'Accidentallly swears',
    'Intentionally swears',
    'Passively calls someone out(no mention of names but we all know)',
    // 'No actual testimony, just stories',
    // 'Inappropriate call to repentance',
    // 'COVID-19',
    // 'Thankimony',
    // 'Too close to the mic',
    // '"This will be quick..."(This wont be quick)',
    // 'Shout out to their partner',
    // 'Unprovoked singing',
    // '"I didnt plan on getting up here today..."'
];


    

const data = shuffle(BingoPoints).reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

console.log(Object.keys(data));

function BingoCard() {
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
  const toggle = id =>
    setState(state => {
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

  return (
    <View>
      <Text style={{color: 'purple', textAlign: 'center', fontSize: 30}}>Bingo</Text>
      <View style ={styles.wrapper}>
        {Object.keys(data).map(id => (
          <Tile
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </Tile>
        ))}
      </View>
      {state.won ? <Confetti /> : null}
    </View>
  );
}

const styles = StyleSheet.create({ 
  wrapper: {
      display: 'flex',
      flex: 5, // the number of columns you want to divide the screen into
      flexDirection: 'row',
      marginHorizontal: "auto",
  },
  
  tile: {
    padding: 10,
    minHeight: 40,
    backgroundColor: 'white',
    fontSize: 20,
    borderStyle: 'dashed',
    borderRadius: 10,
    },
    
  tileSet: {
    background: 'khaki',
    }
  });

export default BingoCard;
