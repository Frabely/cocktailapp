import Home from "./component/pages/Home";
import {Provider as ReduxProvider} from "react-redux";
import store from "./store/configureStore";
import {StatusBar} from "expo-status-bar";

export default function App() {
    return (
        <ReduxProvider store={store}>
            <StatusBar style="auto"/>
            <Home/>
        </ReduxProvider>
    )
}
