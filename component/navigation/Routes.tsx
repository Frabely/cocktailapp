import {NavigationContainer} from '@react-navigation/native';
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import UserProfile from "./screens/UserProfile";
import {HOME, LOGIN, PROFILE, PROFILE_DETAILS, SETTINGS} from "../../constants/const_vars";
import ProfileDetails from "./screens/user_profile/ProfileDetails";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAppSelector} from "../../constants/hooks";
import Settings from "./screens/user_profile/Settings";

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
                            <Stack.Screen name={SETTINGS} component={Settings}/>
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}
