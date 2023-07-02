import React, {FC, useEffect, useState} from 'react';

import {carService, localStorageService} from "../../services";
import {Car} from "../Car/Car";
import {ICar, ICarForUpdate} from "../../interfaces";
import styles from './styles.module.scss';

interface IProps {
    addedCars: ICar[];
    page: number;
    limit: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setMaxPage: React.Dispatch<React.SetStateAction<number>>;
}

const Cars: FC<IProps> = ({page, limit, addedCars, setPage, setMaxPage}) => {
    const [cars, setCars] = useState<ICar[]>([]);
    const [fullCarsLength, setFullCarsLength] = useState<number>(0);
    const [removedCars, setRemovedCars] = useState<number[]>(localStorageService.getRemovedCarsIDList());
    const [editedCars, setEditedCars] = useState<ICarForUpdate[]>(localStorageService.getEditedCarsFieldsList());

    //
    const [carsByCompanyName, setCarsByCompanyName] = useState<ICar[]>([]);
    const [carsByModel, setCarsByModel] = useState<ICar[]>([]);
    const [carsByColor, setCarsByColor] = useState<ICar[]>([]);
    const [carsByYear, setCarsByYear] = useState<ICar[]>([]);
    const [carsByYearLT, setCarsByYearLT] = useState<ICar[]>([]);
    const [carsByYearGT, setCarsByYearGT] = useState<ICar[]>([]);
    //

    const carsData = async () => {
        const {data} = await carService.getAll();

        let cars = addedCars.length ? [...addedCars, ...data.cars] : data.cars;

        cars = findBy(cars);

        if (!removedCars.length && !editedCars.length) {
        } else if (removedCars.length) {
            cars = filterRemovedCars(editedCars.length ? filterEditedCars(cars) : cars);
        } else if (editedCars.length) {
            cars = filterEditedCars(cars);
        }

        setFullCarsLength(cars.length);
        setMaxPage(cars.length - 1);

        setCars(paginatedCars(cars));
    };

    const findBy = (cars: ICar[]) => {
        if (carsByCompanyName.length) cars = carsByCompanyName;
        else if (carsByModel.length) cars = carsByModel;
        else if (carsByColor.length) cars = carsByColor;
        else if (carsByYear.length) cars = carsByYear;
        else if (carsByYearLT.length) cars = carsByYearLT;
        else if (carsByYearGT.length) cars = carsByYearGT;

        if ((carsByCompanyName.length ||
            carsByModel.length ||
            carsByColor.length ||
            carsByYear.length ||
            carsByYearLT.length ||
            carsByYearGT.length) && !(carsByCompanyName.length > page ||
            carsByModel.length > page ||
            carsByColor.length > page ||
            carsByYear.length > page ||
            carsByYearLT.length > page ||
            carsByYearGT.length > page)
        ) {
            setPage(0);
        }

        return cars;
    }

    const filterRemovedCars = (cars: ICar[]): ICar[] => cars.filter((c: ICar) => !removedCars.includes(c.id));

    const filterEditedCars = (cars: ICar[]): ICar[] => {
        const editedCarsIDs: number[] = editedCars.map(({id}) => id);

        return cars.map((car: ICar) =>
            editedCarsIDs.includes(car.id)
                ? {...car, ...editedCars.find(({id}) => id === car.id)}
                : car
        );
    }

    const paginatedCars = (cars: ICar[]): ICar[] =>
        cars.slice(page, page + limit < cars.length ? page + limit : cars.length);


    useEffect(() => {
        carsData();
    }, [page, limit, addedCars, removedCars, editedCars,
        carsByCompanyName,
        carsByModel,
        carsByColor,
        carsByYear,
        carsByYearLT,
        carsByYearGT,
    ]);

    const editedCarsListWithFullFields = (cars: ICar[]): ICar[] => {
        const editedCarsIDs: number[] = editedCars.map(({id}) => id);

        return cars.filter((car: ICar) => editedCarsIDs.includes(car.id));
    };

    return (
        <>
            {!cars.length && <h1>Loading...</h1>}

            {!!cars.length &&
                <>
                    <sup>Found: {fullCarsLength} cars.</sup>

                    <table className={styles.container}>
                        <thead>
                        <tr>
                            <th>Company</th>
                            <th>Model</th>
                            <th>VIN</th>
                            <th>Color</th>
                            <th>Year</th>
                            <th>Price</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            cars.map((car: ICar) =>
                                <Car
                                    key={car.id}
                                    car={car}
                                    setRemovedCars={setRemovedCars}
                                    setEditedCars={setEditedCars}

                                    //
                                    fullEditedCarsList={editedCarsListWithFullFields(cars)}

                                    setCarsByCompanyName={setCarsByCompanyName}
                                    setCarsByModel={setCarsByModel}
                                    setCarsByColor={setCarsByColor}
                                    setCarsByYear={setCarsByYear}
                                    setCarsByYearLT={setCarsByYearLT}
                                    setCarsByYearGT={setCarsByYearGT}
                                    //
                                />
                            )
                        }
                        </tbody>
                    </table>
                </>
            }
        </>
    );
};

export {Cars};