import React, {FC} from 'react';

import {ICar, ICarForUpdate} from "../../interfaces";
import styles from './styles.module.scss';
import {ActionsDropdown} from "../ActionsDropdown/ActionsDropdown";
import {carService, localStorageService} from "../../services";
import {AxiosError} from "axios";

interface IProps {
    car: ICar;
    setRemovedCars: React.Dispatch<React.SetStateAction<number[]>>;
    setEditedCars: React.Dispatch<React.SetStateAction<ICarForUpdate[]>>;

    //
    fullEditedCarsList: ICar[];

    setCarsByCompanyName: React.Dispatch<React.SetStateAction<ICar[]>>
    setCarsByColor: React.Dispatch<React.SetStateAction<ICar[]>>
    setCarsByModel: React.Dispatch<React.SetStateAction<ICar[]>>
    setCarsByYear: React.Dispatch<React.SetStateAction<ICar[]>>
    setCarsByYearLT: React.Dispatch<React.SetStateAction<ICar[]>>
    setCarsByYearGT: React.Dispatch<React.SetStateAction<ICar[]>>
    //
}

const Car: FC<IProps> = ({
                             car,
                             setEditedCars,
                             setRemovedCars,

                             //
                             fullEditedCarsList,

                             setCarsByCompanyName,
                             setCarsByModel,
                             setCarsByColor,
                             setCarsByYear,
                             setCarsByYearLT,
                             setCarsByYearGT,
                             //
                         }) => {

    const {
        car: name,
        car_model,
        car_color,
        car_model_year,
        car_vin,
        price,
        availability,
    } = car;

    const byCompanyName = async () => {
        const cars: ICar[] = localStorageService.getAddedCars().filter(ac => ac.car === name);

        try {
            const {data: {Cars}} = await carService.getByName(name);
            cars.push(...Cars);
        } catch (e) {
            const {response} = e as AxiosError;
            console.warn("AXIOS ERROR = ", response?.data);
        }

        setNull();
        setCarsByCompanyName(cars);
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

        setNull();
        setCarsByModel(cars);
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

        setNull();
        setCarsByColor(cars);
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

        setNull();
        setCarsByYear(cars);
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

        setNull();
        setCarsByYearLT(cars);
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

        setNull();
        setCarsByYearGT(cars);
    }

    const setNull = () => {
        setCarsByCompanyName([]);
        setCarsByModel([]);
        setCarsByColor([]);
        setCarsByYear([]);
        setCarsByYearLT([]);
        setCarsByYearGT([]);
    };

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

            <ActionsDropdown
                car={car}
                setEditedCars={setEditedCars}
                setRemovedCars={setRemovedCars}
            />
        </tr>
    );
};

export {Car};