import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    title: {
        fontSize: 18, 
        fontWeight: '600', 
        letterSpacing: 0.4, 
        marginTop: 12
    },
    description: {
        fontSize: 14, 
        fontWeight: '400', 
        letterSpacing: 0.4, 
        color: 'rgba(89, 89, 89, 1)', 
        marginVertical: 4
    },
    image: {
        height: 172,
        width: '100%', 
        borderRadius: 8
    },
    row: {
        marginTop: 12, 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    viewTopic: {
        height: 26,
        justifyContent: 'center', 
        marginLeft: 4
    },
    textTopic: {
        textAlign: 'center', 
        fontSize: 12, 
        fontWeight: '500'
    }
})

export default styles;