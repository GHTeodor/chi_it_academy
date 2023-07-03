import React, {ChangeEvent, FC, useState} from 'react';

import styles from "./styles.module.scss";
import {Cars} from "../components";
import {Create} from "../components/Modal_Window";

interface IProps {
}

const CarsPaginationPage: FC<IProps> = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(24);
    const [maxPage, setMaxPage] = useState<number>(1000);

    const prev = () => {
        setPage(prev => prev - limit < 1 ? 0 : prev - limit);
    };

    const next = () => {
        setPage(prev => prev + limit);
    };

    const createCar = () => {
        setOpenCreateModal(true);
    };

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        setLimit(+e.target.value);
    };

    return (
        <div className={styles.pagination_page}>
            <div className={styles.pagination_actions}>
                <>
                    <button
                        title={`Previous page [-${limit}]`}
                        className={styles.prev_btn}
                        onClick={prev}
                        disabled={page < 1}
                    >prev
                    </button>

                    <input type="number"
                           title="Start from car №"
                           className={styles.input}
                           placeholder={"Page №"}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPage(+e.target.value)}
                           min={0}
                           max={maxPage}
                           value={page}
                    />

                    <button
                        title={`Next page [+${limit}]`}
                        className={styles.next_btn}
                        onClick={next}
                        disabled={page + limit > maxPage}
                    >next
                    </button>
                </>

                <>
                    <button
                        title="Create new car"
                        className={styles.create_btn}
                        onClick={createCar}
                    >New car
                    </button>
                </>

                <select
                    title="Cars on page"
                    className={styles.select}
                    defaultValue={limit}
                    onChange={handleSelect}
                >
                    <option value={10}>10</option>
                    <option value={24}>24</option>
                    <option value={50}>50</option>
                </select>

            </div>

            <hr/>

            <>
                {openCreateModal && <Create setClose={setOpenCreateModal}/>}
            </>

            <Cars page={page} limit={limit} setPage={setPage} setMaxPage={setMaxPage}/>
        </div>
    );
};

export {CarsPaginationPage};