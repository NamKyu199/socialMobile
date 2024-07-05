import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { Text, View } from "react-native";
import Answer from "./Answer";
import Question from "./Question";

const AnswerQuestion = () => {
    const Tab = createMaterialTopTabNavigator();
    let label = '';

    return (
        <>
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', marginTop: 8, height: '100%', marginBottom: 50 }}>
                <Tab.Navigator screenOptions={({ route }) => ({
                    tabBarLabel: ({ focused }) => {
                        switch (route.name) {
                            case 'Answer':
                                label = 'Câu trả lời ';
                                break;
                            case 'Question':
                                label = 'Câu hỏi ';
                                break;
                            default:
                                label = route.name;
                        }
                        return (
                            <>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: focused ? '600' : '400',
                                    color: focused ? 'rgba(30, 30, 30, 1)' : 'rgba(173, 175, 178, 1)'
                                }}>
                                    {label}
                                </Text>
                                <View style={{height: 1, backgroundColor: focused ? 'rgba(114, 46, 209, 1)' : 'rgba(255, 255, 255, 1)', marginTop: 4}}/>
                            </>
                        )
                    },
                    tabBarItemStyle: { width: 'auto', marginHorizontal: 5 },
                    tabBarIndicatorStyle: { backgroundColor: 'none' },
                })}>
                    <Tab.Screen name="Answer" component={Answer} />
                    <Tab.Screen name="Question" component={Question} />
                </Tab.Navigator>
            </View>
        </>
    )
}

export default AnswerQuestion;