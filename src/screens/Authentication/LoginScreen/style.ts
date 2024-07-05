import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    error: {
        fontSize: 12,
        fontWeight: '400',
        fontStyle: 'italic',
        lineHeight: 14.4,
        color: 'rgba(234, 80, 69, 1)',
        marginLeft: 4
    },
    rowPass: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    rowSaveBox: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    box: {
        width: 16,
        height: 16,
    },
    savePass: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        color:'rgba(30, 30, 30, 1)',
        marginLeft: 15,
        fontFamily:'Roboto-Regular'
    },
    forgotPass: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 22,
        color: 'rgba(102, 85, 208, 1)',
        fontFamily:'Roboto-Regular'
    },
    rowRegister: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 24
    },
    text: {
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
        color: 'rgba(140, 140, 140, 1)'
    },
    register: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 22,
        color: 'rgba(235, 47, 150, 1)'
    }
})

export default styles;