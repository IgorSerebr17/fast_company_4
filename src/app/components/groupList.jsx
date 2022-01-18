import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, onItemSelect, idProp, nameProp, selectedItem }) => {
    console.log("Object.keys(items) = ", Object.keys(items));

    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => {
                console.log("items[item][idProp] = ", items[item][idProp]);
                return (
                    <li
                        className={
                            "list-group-item " +
                            (items[item][idProp] === selectedItem
                                ? "list-group-item active"
                                : "list-group-item")
                        }
                        key={items[item][idProp]}
                        onClick={() => onItemSelect(items[item])}
                        role="button"
                    >
                        {items[item][nameProp]}
                    </li>
                );
            })}
        </ul>
    );
};

GroupList.defaultProps = {
    idProp: "_id",
    nameProp: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func.isRequired,
    idProp: PropTypes.string.isRequired,
    nameProp: PropTypes.string.isRequired,
    selectedItem: PropTypes.string
};

export default GroupList;
