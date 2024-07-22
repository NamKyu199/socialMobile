import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 1)', 
        paddingTop: 16
    },
    view: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingHorizontal: 16,
        paddingBottom: 36
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        borderWidth: 0.4,
        borderColor: 'rgba(215, 215, 215, 0.8)',
        marginVertical: 8
    }
})

export default styles;