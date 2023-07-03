import React, {FC, RefObject} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";

import styles from "./styles.module.scss";
import {ICar} from "../../../interfaces";
import {localStorageService} from "../../../services";
import {useAppReducer} from "../../../hooks";
import {carActions} from "../../../reducers";

interface IProps {
    selectRef: RefObject<HTMLSelectElement>;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    car: ICar;

}

const Edit: FC<IProps> = ({car, setClose, selectRef}) => {
    const {dispatch} = useAppReducer();
    const {reset, handleSubmit, register, formState: {isValid, errors}} = useForm<ICar>();

    const edit: SubmitHandler<ICar> = (editedCar: ICar): void => {
        const [isNewColor, isNewPrice, isNewAvailability] =
            [
                car.car_color !== editedCar.car_color,
                car.price !== editedCar.price,
                car.availability !== editedCar.availability,
            ];

        if (isNewColor || isNewPrice || isNewAvailability) {

            localStorageService.addCarFieldsToEditedCarsList({
                id: +editedCar.id,
                car_color: editedCar.car_color,
                price: "$" + (+editedCar.price).toFixed(2),
                availability: editedCar.availability
            });
            dispatch(carActions.setEditedCars(localStorageService.getEditedCarsFieldsList()));
        }

        reset();
        selectRef.current!.value = "";
        setClose(prev => !prev);
    };

    const close = () => {
        setClose(prev => !prev);
        selectRef.current!.value = "";
    }

    return (
        <div className={styles.edit}>
            <div className={styles.container}>
            <span>
                <h1>Edit car</h1>

                <button type="reset" onClick={close}>Esc</button>
            </span>

                <br/>

                <form className={styles.form} onSubmit={handleSubmit(edit)}>
                    <div>
                        <input type="number" hidden {...register('id')} defaultValue={car.id}/>

                        <label>
                            <b>Company: &nbsp;</b>

                            <input
                                type="text"
                                placeholder={"ex. Mercedes-Benz"}
                                defaultValue={car.car}
                                className={styles.disabled}
                                disabled
                                title="Disabled field"
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
                                defaultValue={car.car_model}
                                className={styles.disabled}
                                disabled
                                title="Disabled field"
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
                                defaultValue={car.car_color}
                                {...register("car_color", {required: true})}
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
                                className={styles.disabled}
                                disabled
                                title="Disabled field"
                                defaultValue={car.car_model_year}
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
                                defaultValue={car.car_vin}
                                className={styles.disabled}
                                disabled
                                title="Disabled field"
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
                                placeholder={"ex. $1386.49"}
                                min={0}
                                step={".01"}
                                defaultValue={car.price.replace("$", "")}
                                {...register("price", {required: true, min: 0})}
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
                            defaultChecked={car.availability}
                            {...register("availability")}
                        />
                    </label>

                    <button type="submit" disabled={!isValid}>EDIT</button>
                </form>
            </div>
        </div>
    );
};

export {Edit};