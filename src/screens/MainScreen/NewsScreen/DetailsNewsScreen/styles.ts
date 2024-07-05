import { Dimensions, StyleSheet } from "react-native";
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    fromEventNew: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingTop: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 15,
        paddingVertical:8
    },
    titleEvent2: {
        marginLeft: 20,
        width: 200,
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 20,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily:'Roboto-Medium'
    },
    from_heart:{
        backgroundColor: '#F2F2F2', 
        height: PAGE_HEIGHT*0.06, 
        width: PAGE_WIDTH*0.12, 
        borderRadius: 50, 
        marginTop: 25,
    }
})

export default styles;