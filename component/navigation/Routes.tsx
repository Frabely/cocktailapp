import {NavigationContainer} from '@react-navigation/native';
import CocktailList from "./screens/CocktailList";
import LoginScreen from "./screens/LoginScreen";
import UserProfile from "./screens/UserProfile";
import {FAVORITES, HOME, LOGIN, PROFILE, PROFILE_DETAILS, SETTINGS} from "../../constants/const_vars";
import ProfileDetails from "./screens/user_profile/ProfileDetails";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAppSelector} from "../../constants/hooks";
import Settings from "./screens/user_profile/Settings";
import {useEffect, useState} from "react";
import {useWindowDimensions} from "react-native";

export default function Routes() {
    const state = useAppSelector((state) => state)
    const Stack = createNativeStackNavigator();
    const [rerender, setRerender] = useState(0);

    useEffect(() => {
        setRerender(rerender+1)
    }, [SCREEN_WIDTH, SCREEN_HEIGHT]);


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={LOGIN} screenOptions={{
                headerShown: false
            }}>
                {state?.user?.email === null ?
                    <Stack.Screen name={LOGIN} component={LoginScreen}/> : (
                        <>
                            <Stack.Screen name={HOME} component={CocktailList}/>
                            <Stack.Screen name={PROFILE} component={UserProfile}/>
                            <Stack.Screen name={PROFILE_DETAILS} component={ProfileDetails}/>
                            <Stack.Screen name={SETTINGS} component={Settings}/>
                            <Stack.Screen name={FAVORITES} component={CocktailList}/>
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export const SCREEN_WIDTH = useWindowDimensions().width;
export const SCREEN_HEIGHT = useWindowDimensions().height;
