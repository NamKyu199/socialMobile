import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#000000AA'
    },
    view: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        height: '25%',
        marginHorizontal: 23,
        borderRadius: 8
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 28,
        color: 'rgba(0, 0, 0, 0.85)',
        marginTop: 40
    },
    description: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        color: 'rgba(0, 0, 0, 0.45)',
        marginTop: 8
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 49.5,
        marginTop: 40
    },
    textNo: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 24,
        color: 'rgba(114, 46, 209, 1)'
    },
    btn: {
        backgroundColor: 'rgba(114, 46, 209, 1)',
        width: 112,
        height: 36.8,
        justifyContent: 'center',
        borderRadius: 8
    },
    textDel: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24,
        color: 'rgba(255, 255, 255, 1)'
    }
})

export default styles;