import {ICar, ICarForUpdate} from "../../interfaces";
import {CarActionTypesEnum} from "./enum";

export const carActions = {
    setAll: (cars: ICar[]) => ({type: CarActionTypesEnum.SET_ALL, payload: cars}),

    setAddedCars: (cars: ICar[]) => ({type: CarActionTypesEnum.SET_ADDED_CARS, payload: cars}),

    setEditedCars: (cars: ICarForUpdate[]) => ({type: CarActionTypesEnum.SET_EDITED_CARS, payload: cars}),
    setRemovedCars: (carsIDs: number[]) => ({type: CarActionTypesEnum.SET_REMOVED_CARS, payload: carsIDs}),

    setNull: (cars: ICar[]) => ({type: CarActionTypesEnum.SET_NULL, payload: cars}),
    setCarsByCompanyName: (cars: ICar[]) => ({type: CarActionTypesEnum.SET_CARS_BY_COMPANY_NAME, payload: cars}),
    setCarsByModel: (cars: ICar[]) => ({type: CarActionTypesEnum.SET_CARS_BY_MODEL, payload: cars}),
    setCarsByColor: (cars: ICar[]) => ({type: CarActionTypesEnum.SET_CARS_BY_COLOR, payload: cars}),
    setCarsByYear: (cars: ICar[]) => ({type: CarActionTypesEnum.SET_CARS_BY_YEAR, payload: cars}),
    setCarsByYearLT: (cars: ICar[]) => ({type: CarActionTypesEnum.SET_CARS_BY_YEAR_LT, payload: cars}),
    setCarsByYearGT: (cars: ICar[]) => ({type: CarActionTypesEnum.SET_CARS_BY_YEAR_GT, payload: cars}),
};