import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row'
    },
    viewLike: {
        height: 36,
        width: 98,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textLike: {
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 2
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(89, 89, 89, 1)',
    }
})

export default styles;