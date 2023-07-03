import React, {createContext, Dispatch, FC, ReactElement, useReducer} from 'react';

import {ICarAction, ICarInitialState, carInitialState, carReducer} from "../reducers";

interface IStateContext {
    state: ICarInitialState,
    dispatch: Dispatch<ICarAction>,
}

export const StateContext = createContext<IStateContext>({} as IStateContext);

interface IProps {
    children: ReactElement;
}

const Provider: FC<IProps> = ({children}) => {
    const [state, dispatch] = useReducer(carReducer, carInitialState);

    return (
        <StateContext.Provider value={{state, dispatch}}>
            {children}
        </StateContext.Provider>
    );
};

export {Provider};