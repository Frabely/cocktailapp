import {NavigationContainer} from '@react-navigation/native';
import Home from "./pages/Home";
import LoginScreen from "./pages/LoginScreen";
import UserProfile from "./pages/UserProfile";
import {HOME, LOGIN, PROFILE, PROFILE_DETAILS} from "../constants/const_vars";
import ProfileDetails from "./pages/user_profile/ProfileDetails";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAppSelector} from "../constants/hooks";

export default function Routes() {
    const state = useAppSelector((state) => state)
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={LOGIN} screenOptions={{
                headerShown: false
            }}>
                {state?.user?.email === null ?
                    <Stack.Screen name={LOGIN} component={LoginScreen}/> : (
                        <>
                            <Stack.Screen name={HOME} component={Home}/>
                            <Stack.Screen name={PROFILE} component={UserProfile}/>
                            <Stack.Screen name={PROFILE_DETAILS} component={ProfileDetails}/>
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
