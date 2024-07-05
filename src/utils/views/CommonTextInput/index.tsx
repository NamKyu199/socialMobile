import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./style";

export enum StatusTextInput {
    FOCUS = 'Focus',
    BLUR = 'Blur',
    DEFAULT = 'Default'
}

const CommonTextInput = (props: any) => {
    const [isFocused, setIsFocused] = useState<StatusTextInput>(StatusTextInput.DEFAULT);

    const handleFocus = () => {
        setIsFocused(StatusTextInput.FOCUS);
    }

    const handleBlur = () => {
        setIsFocused(StatusTextInput.BLUR);
        if (!props.error) {
            setIsFocused(StatusTextInput.FOCUS)
        } else {
            setIsFocused(StatusTextInput.BLUR)
        }
        if (props.onBlur) {
            props.onBlur();
        }
    }

    return (
        <View style={[styles.view, isFocused === StatusTextInput.FOCUS && styles.focusView, isFocused === StatusTextInput.BLUR && styles.blurView]}>
            {props.prefixIcon != null && (
                <Image
                    style={[styles.prefixIcon, isFocused === StatusTextInput.FOCUS && styles.focusView, isFocused === StatusTextInput.BLUR && styles.blurView]}
                    source={props.prefixIcon}
                />
            )}
            <TextInput
                style={styles.textInput}
                placeholder={props.placeholder}
                secureTextEntry={props.secureTextEntry}
                value={props.value}
                onChangeText={props.onChangeText}
                onBlur={handleBlur}
                onFocus={handleFocus}
                autoCapitalize="none"
                inputMode={props.inputMode}
            />
            <View style={styles.suffixIconView}>
                <TouchableOpacity onPress={props.onPressSuffixIcon}>
                    {props.suffixIcon != null && (
                        <Image source={props.suffixIcon} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CommonTextInput;
