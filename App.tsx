import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import "~translations/i18n"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import ChangePasswordScreen from "~screens/Authentication/ChangePasswordScreen";
import ForgotPasswordScreen from "~screens/Authentication/ForgotPasswordScreen";
import LoginScreen from "~screens/Authentication/LoginScreen";
import OTPAuthenticationScreen from "~screens/Authentication/OTPAuthenticationScreen";
import MainScreen from "~screens/MainScreen";
import RegisterScreen from "~screens/Authentication/RegisterScreen";
import QuestionDetailScreen from "~screens/MainScreen/CommunityScreen/QuestionDetailScreen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import DetailsEventScreen from "~screens/MainScreen/HomeScreen/DetailsEventScreen";
import SearchScreen from "~screens/MainScreen/SearchScreen";
import SearchDetailScreen from "~screens/MainScreen/SearchDetailScreen";
import QuestionUpdateScreen from "~screens/MainScreen/CommunityScreen/QuestionUpdateScreen";
import QuestionCreateScreen from "~screens/MainScreen/CommunityScreen/QuestionCreateScreen";
import DetailsNewsScreen from "~screens/MainScreen/NewsScreen/DetailsNewsScreen";
import NewestRoute from "~screens/MainScreen/CommunityScreen/Routes/NewestRoute";
import RichText from "~screens/RichText";
import NewsScreen from "~screens/MainScreen/NewsScreen";
import CreateReviewsScreen from "~screens/MainScreen/MapsScreen/CreateReviewsScreen";
import EvaluateScreen from "~screens/MainScreen/MapsScreen/EvaluateScreen";
import QuestionComment from "~screens/MainScreen/CommunityScreen/QuestionDetailScreen/QuestionComment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import EditProfile from "~screens/MainScreen/ProfileScreen/EditProfile";

const App = () => {
  const Stack = createNativeStackNavigator();

  const [isLoading, setIsLoading] = useState(true)
  const [userToker, setUserToken] = useState('');

  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          setUserToken(token)
        }
      } catch (error: any) {

      } finally {
        setIsLoading(false)
      }
    }

    checkAccessToken()
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='grey' />
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="OTPAuthenticationScreen" component={OTPAuthenticationScreen} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="QuestionCreateScreen" component={QuestionCreateScreen} options={{ gestureDirection: "vertical" }} />
            <Stack.Screen name="QuestionDetailScreen" component={QuestionDetailScreen} />
            <Stack.Screen name="QuestionUpdateScreen" component={QuestionUpdateScreen} options={{ gestureDirection: "vertical" }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ gestureDirection: 'vertical' }} />
            <Stack.Screen name="SearchDetailScreen" component={SearchDetailScreen} />
            <Stack.Screen name="DetailsEventScreen" component={DetailsEventScreen} />
            <Stack.Screen name="NewestRoute" component={NewestRoute} />
            <Stack.Screen name="DetailsNewsScreen" component={DetailsNewsScreen} />
            <Stack.Screen name="RichText" component={RichText} />
            <Stack.Screen name="NewsScreen" component={NewsScreen} />
            <Stack.Screen name="CreateReviewsScreen" component={CreateReviewsScreen} />
            <Stack.Screen name="EvaluateScreen" component={EvaluateScreen} />
            <Stack.Screen name="QuestionComment" component={QuestionComment} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default App;