import React, {FC} from 'react';
import {AxiosError} from "axios";

import styles from './styles.module.scss';
import {ICar} from "../../interfaces";
import {ActionsDropdown} from "../ActionsDropdown/ActionsDropdown";
import {carService, localStorageService} from "../../services";
import {useAppReducer} from "../../hooks";
import {carActions} from "../../reducers";

interface IProps {
    car: ICar;
    fullEditedCarsList: ICar[];
}

const Car: FC<IProps> = ({car, fullEditedCarsList}) => {
    const {
        car: name,
        car_model,
        car_color,
        car_model_year,
        car_vin,
        price,
        availability,
    } = car;

    const {dispatch} = useAppReducer();

    const byCompanyName = async () => {
        const cars: ICar[] = localStorageService.getAddedCars().filter(ac => ac.car === name);

        try {
            const {data: {Cars}} = await carService.getByName(name);
            cars.push(...Cars);
        } catch (e) {
            const {response} = e as AxiosError;
            console.warn("AXIOS ERROR = ", response?.data);
        }

        dispatch(carActions.setNull([]));
        dispatch(carActions.setCarsByCompanyName(cars));
    }
    const byModel = async () => {
        const cars: ICar[] = localStorageService.getAddedCars().filter(ac => ac.car_model === car_model);

        try {
            const {data: {Cars}} = await carService.getByModel(car_model);
            cars.push(...Cars);
        } catch (e) {
            const {response} = e as AxiosError;
            console.warn("AXIOS ERROR = ", response?.data);
        }

        dispatch(carActions.setNull([]));
        dispatch(carActions.setCarsByModel(cars));
    }
    const byColor = async () => {
        const cars: ICar[] = localStorageService.getAddedCars().filter(ac => ac.car_color === car_color);
        cars.push(...fullEditedCarsList.filter(ec => ec.car_color === car_color));

        try {
            const {data: {Cars}} = await carService.getByColor(car_color);
            cars.push(...Cars);
        } catch (e) {
            const {response} = e as AxiosError;
            console.warn("AXIOS ERROR = ", response?.data);
        }

        dispatch(carActions.setNull([]));
        dispatch(carActions.setCarsByColor(cars));
    }
    const byYear = async () => {
        const cars: ICar[] = localStorageService.getAddedCars().filter(ac => ac.car_model_year === car_model_year);

        try {
            const {data: {Cars}} = await carService.getByYear(car_model_year);
            cars.push(...Cars);
        } catch (e) {
            const {response} = e as AxiosError;
            console.warn("AXIOS ERROR = ", response?.data);
        }

        dispatch(carActions.setNull([]));
        dispatch(carActions.setCarsByYear(cars));
    }
    const byYearLT = async () => {
        const cars: ICar[] = localStorageService.getAddedCars().filter(ac => ac.car_model_year < car_model_year);

        try {
            const {data: {Cars}} = await carService.getByYear_lt(car_model_year);
            cars.push(...Cars);
        } catch (e) {
            const {response} = e as AxiosError;
            console.warn("AXIOS ERROR = ", response?.data);
        }

        dispatch(carActions.setNull([]));
        dispatch(carActions.setCarsByYearLT(cars));
    }
    const byYearGT = async () => {
        const cars: ICar[] = localStorageService.getAddedCars().filter(ac => ac.car_model_year > car_model_year);

        try {
            const {data: {Cars}} = await carService.getByYear_gt(car_model_year);
            cars.push(...Cars);
        } catch (e) {
            const {response} = e as AxiosError;
            console.warn("AXIOS ERROR = ", response?.data);
        }

        dispatch(carActions.setNull([]));
        dispatch(carActions.setCarsByYearGT(cars));
    }

    return (
        <tr className={styles.car}>
            <td className={styles.click} onClick={byCompanyName}>{name}</td>
            <td className={styles.click} onClick={byModel}>{car_model}</td>
            <td>{car_vin}</td>
            <td className={styles.click} onClick={byColor}>{car_color}</td>
            <td>
                <button className={styles.click} onClick={byYearLT}>-</button>
                <span className={styles.click} onClick={byYear}>{car_model_year}</span>
                <button className={styles.click} onClick={byYearGT}>+</button>
            </td>
            <td>{price}</td>
            <td style={{color: availability ? "green" : "red"}}>{availability ? "✓" : "✗"}</td>

            <ActionsDropdown car={car}/>
        </tr>
    );
};

export {Car};