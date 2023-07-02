const baseURL = "https://myfakeapi.com";

export default baseURL;

export const urls = {
    cars: '/api/cars',
    carById: (id: number): string => `/api/cars/${id}`,
    carByName: (name: string): string => `/api/cars/name/${name}`,
    carByModel: (model: string): string => `/api/cars/model/${model}`,
    carByColor: (color: string): string => `/api/cars/color/${color}`,
    carByYear: (year: number): string => `/api/cars/year/${year}`,
    carByYear_lt: (year: number): string => `/api/cars/year/${year}?q=lt`,
    carByYear_gt: (year: number): string => `/api/cars/year/${year}?q=gt`,
};