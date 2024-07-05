import { Home2 } from "iconsax-react-native";
import React from "react";
import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeNewsScreen from "./HomeNewsScreen";
import HeightScreen from "./HeightScreen";
import NutritionScreen from "./NutritionScreen";
import PracticeScreen from "./PracticeScreen";
import TabberComponent from "~component/TabberComponent";

const Tab = createMaterialTopTabNavigator();

const NewsScreen = () => {
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
                fontFamily:'Roboto-Medium'
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
        <Tab.Screen name="Home" component={HomeNewsScreen} options={{ swipeEnabled: false }} />
        <Tab.Screen name="Height" component={HeightScreen} options={{ swipeEnabled: false }} />
        <Tab.Screen name="Nutrition" component={NutritionScreen} options={{ swipeEnabled: false }} />
        <Tab.Screen name="Practice" component={PracticeScreen} options={{ swipeEnabled: false }} />
      </Tab.Navigator>
    </>
  );
}

export default NewsScreen;
