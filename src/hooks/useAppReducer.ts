import {useContext} from "react";

import {StateContext} from "../hoc";

const useAppReducer = () => useContext(StateContext);

export {
    useAppReducer,
};