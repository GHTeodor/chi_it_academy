import React, {FC, RefObject} from 'react';

import styles from './styles.module.scss';
import {localStorageService} from "../../../services";
import {useAppReducer} from "../../../hooks";
import {carActions} from "../../../reducers";

interface IProps {
    selectRef: RefObject<HTMLSelectElement>;
    id: number;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const Delete: FC<IProps> = ({id, setClose, selectRef}) => {
    const {dispatch} = useAppReducer();

    const deleteCar = (id: number): void => {
        localStorageService.addIDToRemovedCarsList(id);
        dispatch(carActions.setRemovedCars(localStorageService.getRemovedCarsIDList()));
    };

    const yes = () => {
        deleteCar(id);
        setClose(prev => !prev);
    };

    const no = () => {
        setClose(prev => !prev);
        selectRef.current!.value = "";
    };

    return (
        <div className={styles.delete}>
            <div className={styles.container}>
                <h1>Do you really want to <i>delete</i> this car?</h1>

                <br/>

                <div className={styles.action}>
                    <button className={styles.close_button} onClick={yes}>Yes
                    </button>
                    <button className={styles.close_button} onClick={no}>No
                    </button>

                </div>
            </div>
        </div>
    );
};

export {Delete};