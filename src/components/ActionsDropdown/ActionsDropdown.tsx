import React, {FC, useRef, useState} from 'react';

import {ICar} from "../../interfaces";
import {Delete, Edit} from "../Modal_Window";

interface IProps {
    car: ICar;
}

const ActionsDropdown: FC<IProps> = ({car}) => {
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openEditModal, setOpenEditModal] = useState<boolean>(false);

    const selectRef = useRef<HTMLSelectElement>(null);

    const handleSelect = () => {
        const value = selectRef.current?.value;

        if (value === "edit") {
            setOpenEditModal(true);
        } else if (value === "delete") {
            setOpenDeleteModal(true);
        }
    };

    return (
        <td>
            {openDeleteModal && <Delete setClose={setOpenDeleteModal} id={car.id} selectRef={selectRef}/>}
            {openEditModal && <Edit setClose={setOpenEditModal} car={car} selectRef={selectRef}/>}

            <select ref={selectRef} defaultValue="" onChange={handleSelect}>
                <option value="edit">
                    Edit
                </option>
                <option value="delete">
                    Delete
                </option>
                <option value="" hidden>❖❖❖</option>
            </select>
        </td>
    );
};

export {ActionsDropdown};