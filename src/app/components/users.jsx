import React, { useState, useEffect } from "react";
import SearchStatus from "./searchStatus";
import User from "./user";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import API from "../api";

const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const pageSize = 2;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf)
        : users;
    const usersCount = filteredUsers.length;
    const currentPageUsers = paginate(filteredUsers, currentPage, pageSize);

    const handleItemSelect = (profession) => {
        setSelectedProf(profession._id);
    };

    useEffect(() => {
        API.professions.fetchProfessions().then((data) =>
            setProfessions(
                Object.assign(data, {
                    allProfessions: { _id: "", name: "Все профессии" }
                })
            )
        );
    }, []);

    useEffect(() => { setCurrentPage(1); }, [selectedProf]);

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleItemSelect}
                        selectedItem={selectedProf}
                    />
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={usersCount} />
                {usersCount > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Имя</th>
                                <th scope="col">Качества</th>
                                <th scope="col">Профессия</th>
                                <th scope="col">Встретился, раз</th>
                                <th scope="col">Оценка</th>
                                <th scope="col">Избранное</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageUsers.map((user) => (
                                <User key={user._id} {...rest} {...user} />
                            ))}
                        </tbody>
                    </table>
                )}
                <Pagination
                    itemsCount={usersCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageCange={handlePageChange}
                />
            </div>
        </div>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
