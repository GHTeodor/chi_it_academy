import {axiosService} from "./axios.service";
import {urls} from "../configs";

export const carService = {
    getAll: async () => await axiosService.get(urls.cars),
    getById: async (id: number) => await axiosService.get(urls.carById(id)),
    getByName: async (name: string) => await axiosService.get(urls.carByName(name)),
    getByModel: async (model: string) => await axiosService.get(urls.carByModel(model)),
    getByColor: async (color: string) => await axiosService.get(urls.carByColor(color)),
    getByYear: async (year: number) => await axiosService.get(urls.carByYear(year)),
    getByYear_lt: async (year: number) => await axiosService.get(urls.carByYear_lt(year)),
    getByYear_gt: async (year: number) => await axiosService.get(urls.carByYear_gt(year)),
};