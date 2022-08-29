// Check Post  cell from frontend

export const isCell = (cell) => {
    let cellFormat = `${/^(8801|\+8801|01)[0-9]{9}$/}`;
    if (cell !== '' && cell.match(cellFormat)) { return true; }
    
    return false;
}