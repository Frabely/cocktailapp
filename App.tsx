import AppEntry from "./component/home/AppEntry";
import {Provider as ReduxProvider} from "react-redux";
import store from "./store/configureStore";

export default function App() {
    return (
        <ReduxProvider store={store}>
            <AppEntry/>
        </ReduxProvider>
    )
}
