const paginate = (items, itemNumber, itemSize) => {
    const startIndex = itemNumber * itemSize - itemSize;
    const endIndex = startIndex + itemSize;
    return items.slice(startIndex, endIndex);
};

export default paginate;
