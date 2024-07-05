import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    username: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.1,
        color: 'rgba(30, 30, 30, 1)'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewLevel: {
        backgroundColor: 'rgba(228, 230, 238, 1)',
        borderRadius: 8
    },
    textLevel: {
        fontSize: 10,
        fontWeight: '600',
        lineHeight: 15,
        letterSpacing: 0.1,
        color: 'rgba(80, 64, 153, 1)',
        paddingHorizontal: 4
    },
    time: {
        fontSize: 12,
        fontWeight: '500',
        color: 'rgba(204, 204, 204, 1)',
        marginLeft: 4
    },
    btn: {
        position: 'absolute',
        right: 0,
        bottom: 18
    }
})

export default styles;