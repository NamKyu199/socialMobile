import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    timer: {
        textAlign: 'center',
        marginTop: 20,
        color: 'rgba(210, 82, 165, 1)',
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 20
    },
    rowText: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    receiveText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 22,
        color: 'rgba(140, 140, 140, 1)'
    },
    retryText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 22,
        color: 'rgba(102, 85, 208, 1)'
    },
    retryBtn: {
        height: 26,
        width: 51,
        backgroundColor: 'rgba(243, 241, 255, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8
    }
})

export default styles;