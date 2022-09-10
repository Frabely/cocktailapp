import {StyleSheet} from "react-native";
import {faSort} from "@fortawesome/free-solid-svg-icons";
import SortButton from "./SortButton";

export default function Sorting({}: SortingProps) {
    return (
        <>
            <SortButton icon={faSort}/>
            <SortButton icon={faSort}/>
            <SortButton icon={faSort}/>
        </>
    )

}

const styles = StyleSheet.create({
    sorting: {}
})

export type SortingProps = {

}
