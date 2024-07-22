import { Home2 } from "iconsax-react-native";
import React, { useState } from "react";
import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeNewsScreen from "./HomeNewsScreen";
import HeightScreen from "./HeightScreen";
import NutritionScreen from "./NutritionScreen";
import PracticeScreen from "./PracticeScreen";
import TabberComponent from "~component/TabberComponent";

const Tab = createMaterialTopTabNavigator();
const NewsScreen = () => {
  const [currentTab, setCurrentTab] = useState('');
  return (
    <>
      <TabberComponent />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarScrollEnabled: true,
          swipeEnabled: false,
          tabBarIcon: ({ focused }) => {
            if (route.name === 'Home') {
              return (
                <Home2
                  variant={focused ? 'Bold' : 'Linear'}
                  color={focused ? 'rgba(114, 46, 209, 1)' : 'rgba(173, 175, 178, 1)'}
                  size={25}
                  style={{ marginTop: 10 }}
                />
              );
            }
            return null;
          },
          tabBarLabel: ({ focused }) => {
            let label;
            switch (route.name) {
              case 'Home':
                return null;
              case 'Height':
                label = 'Chiều cao';
                break;
              case 'Nutrition':
                label = 'Dinh dưỡng';
                break;
              case 'Practice':
                label = 'Luyện tập';
                break;
              default:
                label = route.name;
            }
            return (
              <Text style={{
                fontSize: 14,
                color: focused ? 'rgba(114, 46, 209, 1)' : 'rgba(30, 30, 30, 1)',
                fontWeight: '400',
                fontFamily: 'Roboto-Medium'
              }}>
                {label}
              </Text>
            );
          },
          showIcon: route.name === 'Home',
          tabBarIndicatorStyle: {
            backgroundColor: 'rgba(114, 46, 209, 1)',
          },
          tabBarItemStyle: {
            width: 'auto',
            marginTop: -25,
            marginHorizontal: 10
          },
          defaultNavigationOptions: {
            gesturesEnabled: false,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeNewsScreen}
          options={{ swipeEnabled: false }}
          listeners={{
            tabPress: () => {
              setCurrentTab('Home');
            }
          }}
        />
        <Tab.Screen
          name="Chiều cao"
          component={HeightScreen}
          options={{ swipeEnabled: false }}
          listeners={{
            tabPress: () => {
              setCurrentTab('Chiều cao');
            }
          }}
        />
        <Tab.Screen
          name="Dinh dưỡng"
          component={NutritionScreen}
          options={{ swipeEnabled: false }}
          listeners={{
            tabPress: () => {
              setCurrentTab('Dinh dưỡng');
            }
          }}
        />
        <Tab.Screen
          name="Luyện tập"
          component={PracticeScreen}
          options={{ swipeEnabled: false }}
          listeners={{
            tabPress: () => {
              setCurrentTab('Luyện tập');
            }
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default NewsScreen;
