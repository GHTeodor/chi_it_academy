import {ICar, ICarForUpdate} from "../interfaces";
import {CarActionTypesEnum, ICarAction} from "./actions";
import {localStorageService} from "../services";

export interface ICarInitialState {
    cars: ICar[];

    addedCars: ICar[];

    removedCars: number[];
    editedCars: ICarForUpdate[];

    setNull: [],
    carsByCompanyName: ICar[];
    carsByModel: ICar[];
    carsByColor: ICar[];
    carsByYear: ICar[];
    carsByYearLT: ICar[];
    carsByYearGT: ICar[];
}

const carInitialState: ICarInitialState = {
    cars: [],

    addedCars: localStorageService.getAddedCars(),

    removedCars: localStorageService.getRemovedCarsIDList(),
    editedCars: localStorageService.getEditedCarsFieldsList(),

    setNull: [],
    carsByCompanyName: [],
    carsByModel: [],
    carsByColor: [],
    carsByYear: [],
    carsByYearLT: [],
    carsByYearGT: [],
}

const carReducer = (state: ICarInitialState, action: ICarAction) => {
    switch (action.type) {
        case CarActionTypesEnum.SET_ALL:
            return {...state, cars: action.payload};

        case CarActionTypesEnum.SET_ADDED_CARS:
            return {...state, addedCars: action.payload};

        case CarActionTypesEnum.SET_EDITED_CARS:
            return {...state, editedCars: action.payload};
        case CarActionTypesEnum.SET_REMOVED_CARS:
            return {...state, removedCars: action.payload};

        case CarActionTypesEnum.SET_NULL:
            return {
                ...state,
                carsByCompanyName: action.payload,
                carsByModel: action.payload,
                carsByColor: action.payload,
                carsByYear: action.payload,
                carsByYearLT: action.payload,
                carsByYearGT: action.payload,
            };
        case CarActionTypesEnum.SET_CARS_BY_COMPANY_NAME:
            return {...state, carsByCompanyName: action.payload};
        case CarActionTypesEnum.SET_CARS_BY_MODEL:
            return {...state, carsByModel: action.payload};
        case CarActionTypesEnum.SET_CARS_BY_COLOR:
            return {...state, carsByColor: action.payload};
        case CarActionTypesEnum.SET_CARS_BY_YEAR:
            return {...state, carsByYear: action.payload};
        case CarActionTypesEnum.SET_CARS_BY_YEAR_LT:
            return {...state, carsByYearLT: action.payload};
        case CarActionTypesEnum.SET_CARS_BY_YEAR_GT:
            return {...state, carsByYearGT: action.payload};

        default:
            return state;
    }
}

export {
    carInitialState,
    carReducer,
};