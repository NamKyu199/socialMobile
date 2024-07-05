import { Dimensions, StyleSheet } from "react-native";
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    title:{
        fontWeight:'500',
        fontSize:30,
        lineHeight:35,
        color:'rgba(30, 30, 30, 1)',
        marginTop:20,
        borderBottomWidth:3,
        borderColor:'rgba(151, 78, 195, 1)',
        fontFamily:'Roboto-Medium'
    },
    from_backgroud_event: {
        marginTop:15,
        height:PAGE_HEIGHT*0.26,
        width:PAGE_WIDTH*0.8,
        marginHorizontal:10,
    },
    background_envent: {
        height:PAGE_HEIGHT*0.26,
        width:PAGE_WIDTH*0.8,
        borderRadius: 8,
        opacity: 0.7,
        backgroundColor: 'black',
    },
    date_title: {
        marginHorizontal:8,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
    hastag1: {
        height: 25,
        width: 80,
        borderRadius: 16,
        alignItems: 'center',
        marginHorizontal:5
    },
    headingHastag: {
        fontWeight: '500',
        fontSize: 13,
        color: 'rgba(255, 255, 255, 1)',
        lineHeight: 22,
        fontFamily:'Roboto-Regular'
    },
    footerEvent: {
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8
    },
    title_heading:{
        fontWeight:'600',
        fontSize:20,
        lineHeight:25,
        color:'rgba(255, 255, 255, 1)',
        marginHorizontal:15,
        marginTop:10,
        fontFamily:'Roboto-Medium'
    },
    header_heading: {
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily:'Roboto-Medium'
    },
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
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 20,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily:'Roboto-Medium'
    },
})

export default styles;