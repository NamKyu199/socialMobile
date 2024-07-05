import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    headerView: {
        backgroundColor: 'rgba(248, 249, 252, 1)', 
        height: 98, 
        paddingTop: 59, 
        borderWidth: 0.4, 
        borderColor: 'rgba(221, 221, 221, 1)'
    },
    headerText: {
        fontSize: 18, 
        fontWeight: '700', 
        textAlign: 'center'
    },
    prefixIcon: {
        position: 'absolute', 
        top: 45
    },
    suffixBtn: {
        width: 70, 
        height: 33, 
        borderRadius: 4, 
        marginRight: 16, 
        justifyContent: 'center', 
        position: 'absolute', 
        top: 52, 
        right: 0
    },
    textBtn: {
        fontSize: 16, 
        fontWeight: '400', 
        lineHeight: 19, 
        color: 'rgba(255, 255, 255, 1)', 
        textAlign: 'center'
    },
    body: {
        backgroundColor: 'rgba(255, 255, 255, 1)', 
        height: '100%', 
        paddingTop: 11, 
        paddingHorizontal: 16
    },
    textView: {
        marginVertical: 12, 
        paddingHorizontal: 4, 
        paddingBottom: 8
    },
    text: {
        fontSize: 14, 
        fontWeight: '600', 
        marginBottom: 5
    },
    lineView: {
        borderWidth: 0.4, 
        borderColor: 'rgba(215, 215, 215, 0.8)'
    }
})

export default styles;