import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";
import { ColorStar
    , StarIcon } from "~utils/images/svg";

interface Props {
    setStarRating: any
    starRating: any
}

const EvaluateComponent = ({setStarRating,starRating }: Props) => {
    return (
        <View style={styles.stars}>
            <TouchableOpacity onPress={() => setStarRating(1)}>
                {starRating >= 1 ? <ColorStar width={36} height={36}/> : <StarIcon width={36} height={36}/>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStarRating(2)}>
                {starRating >= 2 ? <ColorStar width={36} height={36}/> : <StarIcon width={36} height={36}/>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStarRating(3)}>
                {starRating >= 3 ? <ColorStar width={36} height={36}/> : <StarIcon width={36} height={36}/>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStarRating(4)}>
                {starRating >= 4 ? <ColorStar width={36} height={36}/> : <StarIcon width={36} height={36}/>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStarRating(5)}>
                {starRating >= 5 ? <ColorStar width={36} height={36}/> : <StarIcon width={36} height={36}/>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    stars: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:35,
        marginTop:20
    },
});

export default EvaluateComponent;