import Home from "./component/home/Home";
import {Provider as ReduxProvider} from "react-redux";
import store from "./store/configureStore";

export default function App() {
    return (
        <ReduxProvider store={store}>
            <Home/>
        </ReduxProvider>
    )
}
