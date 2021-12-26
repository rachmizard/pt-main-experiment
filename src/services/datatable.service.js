export default class DatatableService {
  generateClauseSortFilter(sorts = []) {
    return sorts
      .map((sort, index) => {
        const getProp = Object.keys(sort);

        return `${getProp}:${sort[getProp]}`;
      })
      .join(",");
  }
}
