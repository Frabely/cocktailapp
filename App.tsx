import {Provider as ReduxProvider} from "react-redux";
import store from "./store/configureStore";
import Routes from "./component/navigation/Routes";
import {StatusBar} from "expo-status-bar";

export default function App() {
    return (
        <ReduxProvider store={store}>
            {/*<StatusBar style="auto"/>*/}
            <Routes/>
        </ReduxProvider>
    )
}
