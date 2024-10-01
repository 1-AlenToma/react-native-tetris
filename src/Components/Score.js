import React from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    Dimensions
} from '../Controllers';

export default function Score({score}){
    return (
        <SafeAreaView css="wi:100% he:50, bac:#141515 pa:5 juc:center ali:center">
            <Text css="co:#fff fos:22 fow:bold" >Score: { score }</Text>
        </SafeAreaView>
    )
}