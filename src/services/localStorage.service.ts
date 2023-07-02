import {ICar, ICarForUpdate} from "../interfaces";

class LocalStorageService {
    private readonly ADD_CAR: string = "add_car";

    private readonly EDITED_CARS: string = "edited_cars";
    private readonly REMOVED_CARS: string = "removed_cars";

    public addCar(car: ICar): void {
        localStorage.setItem(this.ADD_CAR, JSON.stringify([...this.getAddedCars(), car]));
    }

    public getAddedCars(): ICar[] {
        const addedCars: string | null = localStorage.getItem(this.ADD_CAR);
        return addedCars ? JSON.parse(addedCars) : [];
    }

    public getEditedCarsFieldsList(): ICarForUpdate[] {
        const editedCarsFields: string | null = localStorage.getItem(this.EDITED_CARS);
        return editedCarsFields ? JSON.parse(editedCarsFields) : [];
    }

    public addCarFieldsToEditedCarsList(car: ICarForUpdate): void {
        const addCarFieldsToEditedCars: ICarForUpdate[] =
            !this.getEditedCarsFieldsList().some(({id}: { id: number }): boolean => +id === car.id)
                ? [...this.getEditedCarsFieldsList(), car]
                : this.getEditedCarsFieldsList().map(c => car.id === c.id ? car : c);

        localStorage.setItem(this.EDITED_CARS, JSON.stringify(addCarFieldsToEditedCars));
    }

    private removeCarFromAddedCars(id: number): void {
        const removeFromEditIfDeleted: ICarForUpdate[] = this.getAddedCars().filter(car => id !== car.id);
        localStorage.setItem(this.ADD_CAR, JSON.stringify(removeFromEditIfDeleted));
    }

    private removeCarFromEditAfterDelete(id: number): void {
        const removeFromEditIfDeleted: ICarForUpdate[] = this.getEditedCarsFieldsList().filter(car => id !== car.id);
        localStorage.setItem(this.EDITED_CARS, JSON.stringify(removeFromEditIfDeleted));
    }

    public getRemovedCarsIDList(): number[] {
        const removedCarsID: string | null = localStorage.getItem(this.REMOVED_CARS);
        return removedCarsID ? JSON.parse(removedCarsID) : [];
    }

    public addIDToRemovedCarsList(id: number): void {
        this.removeCarFromEditAfterDelete(id);
        this.removeCarFromAddedCars(id);

        if (!this.getRemovedCarsIDList().includes(id)) {

            const addIDToRemovedCars: number[] = [...this.getRemovedCarsIDList(), id];
            localStorage.setItem(this.REMOVED_CARS, JSON.stringify(addIDToRemovedCars));
        }

    }
}

export const localStorageService: LocalStorageService = new LocalStorageService();