import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

const Input = (props: any) => {
    const [focused, setFocuesed] = useState(false);

    return (
        <>
            <Text style={{ fontSize: 14, fontWeight: '500', lineHeight: 22, marginTop: 24 }}>
                {props.text}
            </Text>
            <View style={{ borderWidth: 1, borderColor: focused ? 'rgba(114, 46, 209, 1)' : 'rgba(221, 221, 221, 1)', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, paddingBottom: 12, marginTop: 4 }}>
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={'rgba(166, 166, 166, 1)'}
                    multiline={true}
                    selectionColor={'rgba(114, 46, 209, 1)'}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    onFocus={() => setFocuesed(!focused)}
                />
            </View>
        </>
    )
}

export default Input;