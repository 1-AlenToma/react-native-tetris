import React from 'react';
import {
  View,
  Text
} from "../Controllers";

export default function BestScores( {
  data
}) {


  return (
    <View ifTrue={() => data && data.length > 0} css="sta le:5 to:40 pal:30 pab:80">
      <View>
        <Text css="fos:20 co:#fff fow:bold mab:5">Best scores</Text>
        {
        data.map(
          (element, index) => <Text key={index} css="co:#fff"> #{index+1} - {element} </Text>
        )
        }
      </View>
    </View>
  );
}