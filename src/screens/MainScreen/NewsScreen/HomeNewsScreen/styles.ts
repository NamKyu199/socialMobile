import { Dimensions, StyleSheet } from "react-native";
const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    from_header: {
        marginHorizontal: 15
    },
    header_heading: {
        fontWeight: '600',
        fontSize: 20,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily:'Roboto-Bold'
    },
    background_envent: {
        borderRadius: 8,
        width:'100%',
        height:'100%'
    },
    from_eventTop: {
        marginRight: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical:12,
        paddingHorizontal:12
    },
    from_eventTop1: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical:12,
        paddingHorizontal:12
    },
    hastag1: {
        height: 25,
        backgroundColor: 'rgba(171, 81, 228, 1)',
        borderRadius: 16,
        alignItems: 'center',
        marginHorizontal: 2
    },
    hastag2: {
        height: 25,
        width: 80,
        backgroundColor: 'rgba(114, 46, 209, 1)',
        borderRadius: 16,
        alignItems: 'center',
        marginHorizontal: 5
    },
    hastag3: {
        height: 25,
        width: 80,
        backgroundColor: 'rgba(105, 24, 165, 1)',
        borderRadius: 16,
        alignItems: 'center'
    },
    headingHastag: {
        fontWeight: '500',
        fontSize: 13,
        color: 'rgba(255, 255, 255, 1)',
        lineHeight: 22, 
        paddingHorizontal: 12,
        fontFamily:'Roboto-Medium'
    },
    titleEvent: {
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 20,
        color: 'rgba(30, 30, 30, 1)',
        marginTop: 8,
        fontFamily:'Roboto-Medium',
        paddingVertical:3
    },
    titleEvent1: {
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 20,
        color: 'rgba(30, 30, 30, 1)',
        marginTop: 8,
        fontFamily:'Roboto-Medium'
    },
    titleEvent2: {
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 18,
        lineHeight: 20,
        color: 'rgba(30, 30, 30, 1)',
        fontFamily:'Roboto-Medium'
    },
    footerEvent: {
        marginTop:12,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    row: {
        flex: 1,
        gap: 15,
        marginVertical: 5,
        width:'50%',
        height:'100%',
        paddingHorizontal:5,
        marginTop:20,
      },

})

export default styles;