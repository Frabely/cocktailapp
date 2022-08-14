import {Router, Scene} from "react-native-router-flux";
import Home from "./pages/Home";
import LoginScreen from "./pages/LoginScreen";
import UserProfile from "./pages/UserProfile";
import {HOME, LOGIN, PROFILE, PROFILE_DETAILS} from "../constants/const_vars";
import ProfileDetails from "./pages/user_profile/ProfileDetails";

export default function Routes() {
    return (
        <Router>
            <Scene key = "root">
                <Scene key={HOME} component = {Home} title = "Home"/>
                <Scene key={LOGIN} component = {LoginScreen} title = "Login" initial = {true} />
                <Scene key={PROFILE} component = {UserProfile} title = "User Profile"/>
                <Scene key={PROFILE_DETAILS} component = {ProfileDetails} title = "Profile Details"/>
            </Scene>
        </Router>
    )
}
