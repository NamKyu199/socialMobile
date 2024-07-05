import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    view: {
        height: 48,
        borderWidth: 1,
        borderColor: 'rgba(166, 166, 166, 1)',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    prefixIcon: {
        marginLeft: 12,
    },
    textInput: {
        marginLeft: 12,
        fontSize: 14,
        fontWeight: '400',
        color: 'rgba(30, 30, 30, 1)',
        width: '100%',
        fontFamily:'Roboto-Regular'
    },
    suffixIconView: {
        position: 'absolute',
        right: 10,
        top: 12
    },
    focusView: {
        borderColor: 'rgba(231, 79, 177, 1)',
        tintColor: 'rgba(231, 79, 177, 1)'
    },
    blurView: {
        borderColor: 'rgba(234, 80, 69, 1)',
        tintColor: 'rgba(234, 80, 69, 1)',
    },
})

export default styles;