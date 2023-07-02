import React, {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import styles from "./styles.module.scss";
import {ICar} from "../../../interfaces";
import {createValidator} from "../../../validators";
import {localStorageService} from "../../../services";

interface IProps {
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    setAddedCars: React.Dispatch<React.SetStateAction<ICar[]>>;
}

const Create: FC<IProps> = ({setClose, setAddedCars}) => {
    const {reset, handleSubmit, register, formState: {isValid, errors}} = useForm<ICar>({
        mode: "all",
        resolver: joiResolver(createValidator),
    });

    const save: SubmitHandler<ICar> = (car: ICar): void => {
        car.id = new Date().getMilliseconds() + Math.random();
        car.price = "$" + (+car.price).toFixed(2);
        localStorageService.addCar(car);
        setAddedCars(localStorageService.getAddedCars());

        reset();
        setClose(prev => !prev);
    };

    return (
        <div className={styles.create}>
            <div className={styles.container}>
                <span>
                    <h1>Create new car</h1>

                    <button onClick={() => setClose(prev => !prev)}>Esc</button>
                </span>

                <br/>

                <form className={styles.form} onSubmit={handleSubmit(save)}>
                    <div>
                        <label>
                            <b>Company: &nbsp;</b>

                            <input
                                type="text"
                                placeholder={"ex. Mercedes-Benz"}
                                {...register("car")}
                            />
                        </label>

                        <p className={styles.error_message}>
                            {errors.car?.message?.replace('"car"', '"company"')}
                        </p>
                    </div>

                    <div>
                        <label>
                            <b>Model: &nbsp;</b>

                            <input
                                type="text"
                                placeholder={"ex. SL-Class"}
                                {...register("car_model")}
                            />
                        </label>

                        <p className={styles.error_message}>
                            {errors.car_model?.message?.replace('"car_model"', '"model"')}
                        </p>
                    </div>

                    <div>
                        <label>
                            <b>Color: &nbsp;</b>

                            <input
                                type="text"
                                placeholder={"ex. Aquamarine"}
                                {...register("car_color")}
                            />
                        </label>

                        <p className={styles.error_message}>
                            {errors.car_color?.message?.replace('"car_color"', '"color"')}
                        </p>
                    </div>

                    <div>
                        <label>
                            <b>Year: &nbsp;</b>

                            <input
                                type="number"
                                placeholder={"ex. 1989"}
                                min={1926}
                                max={new Date().getUTCFullYear()}
                                {...register("car_model_year")}
                            />
                        </label>

                        <p className={styles.error_message}>
                            {errors.car_model_year?.message?.replace('"car_model_year"', '"year"')}
                        </p>
                    </div>

                    <div>
                        <label>
                            <b>VIN: &nbsp;</b>

                            <input
                                type="text"
                                placeholder={"ex. 4A4AP3AU8FE713946"}
                                maxLength={17}
                                {...register("car_vin")}
                            />
                        </label>

                        <p className={styles.error_message}>
                            {errors.car_vin?.message?.replace('"car_vin"', '"VIN"')}
                        </p>
                    </div>

                    <div>
                        <label>
                            <b>Price: &nbsp;</b>

                            <input
                                type="number"
                                min={0}
                                step={".01"}
                                placeholder={"ex. $1386.49"}
                                {...register("price")}
                            />
                        </label>

                        <p className={styles.error_message}>
                            {errors.price?.message}
                        </p>
                    </div>

                    <label>
                        <b>Availability: &nbsp;</b>

                        <input
                            type="checkbox"
                            {...register("availability")}
                        />
                    </label>

                    <button type="submit" disabled={!isValid}>Save</button>
                </form>
            </div>
        </div>
    );
};

export {Create};