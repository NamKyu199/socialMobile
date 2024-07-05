import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    phone: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 22,
        color: 'rgba(30, 30, 30, 1)'
    },
    rowOTP: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 60,
        marginTop: 20
    },
    textInput: {
        borderWidth: 1,
        // borderColor: 'rgba(222, 226, 230, 1)',
        width: 48,
        height: 48,
        borderRadius: 8,
        textAlign: 'center',
        
    },
})

export default styles;