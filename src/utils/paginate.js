// import _ from 'lodash';

export function paginate(arr, currentPageNum, pageSize) {
    const startIdx = (currentPageNum-1) * pageSize;
    return [...arr].slice(startIdx, startIdx + pageSize);
}
