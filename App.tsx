import {Provider as ReduxProvider} from "react-redux";
import store from "./store/configureStore";
import Routes from "./component/Routes";

export default function App() {
    return (
        <ReduxProvider store={store}>
            <Routes/>
        </ReduxProvider>
    )
}
