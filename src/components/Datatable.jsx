/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
     Button,
     Col,
     Form,
     Row,
     Spinner,
     Table,
     Pagination,
} from "react-bootstrap";
import { FaSearch, FaSortDown, FaSortUp } from "react-icons/fa";
import usePagination from "src/hooks/usePagination";
import DatatableService from "src/services/datatable.service";

const datatableService = new DatatableService();

const Datatable = ({
     loading = false,
     columns = [],
     sourceData = [],
     onSubmitFilter,
     customPanel,
     defaultQuery,
     withSearch,
     searchPlacholder = "Search...",
     customFilterPlugin,
     paginate = {
          totalCount: 0,
          siblingCount: 1,
          currentPage: 1,
     },
}) => {
     const { totalCount, siblingCount, currentPage } = paginate;

     const [query, setQuery] = useState({
          page: 1,
          limit: 8,
          ...defaultQuery,
     });

     useEffect(() => {
          flushTableSort();
     }, []);

     useEffect(() => {
          onSubmitFilter(query);
     }, [query?.sortBy, query.limit, query.page, query]);

     const [sorts, setSorts] = useState([]);

     const renderRecord = (record, columnIndex) => {
          return {
               record,
               value: record[columns[columnIndex]?.index],
          };
     };

     const flushTableSort = () => {
          const overrideSorts = columns
               .filter((value) => value.sort === true)
               .map((column) => ({ [column.index]: "asc" }));

          setSorts(overrideSorts);
     };

     const setFilterSort = (by) => {
          const order = sorts.find((filter) => filter[by]);
          const findIndex = sorts.indexOf(order);
          const updateSorts = sorts;
          updateSorts[findIndex][by] = order[by] === "asc" ? "desc" : "asc";

          const sortBy = datatableService.generateClauseSortFilter(updateSorts);

          setSorts(updateSorts);
          setQuery((state) => ({ ...state, sortBy }));
     };

     const filterQuery = (e) => {
          e.preventDefault();

          onSubmitFilter(query);
     };

     const handleSearch = (search) => {
          setQuery((state) => ({ ...state, search }));
     };

     const setLimitQuery = (limit) => {
          setQuery((state) => ({ ...state, page: 1, limit }));
     };

     const setPageQuery = (page) => {
          setQuery((state) => ({ ...state, page }));
     };

     const renderCustomFilterPlugins = () => {
          return React.Children.map(customFilterPlugin, (child) => {
               return React.cloneElement(child, {
                    onChange: (e) => {
                         setQuery((state) => ({
                              ...state,
                              [child.props?.name]: e.target.value,
                         }));
                    },
               });
          });
     };

     return (
          <>
               <Row className="mb-3">
                    <Col lg={4} hidden={!withSearch}>
                         <Form onSubmit={filterQuery}>
                              <Row>
                                   <Col>
                                        <Form.Group controlId="formSearch">
                                             <Form.Control
                                                  size="sm"
                                                  onChange={(e) =>
                                                       handleSearch(
                                                            e.target.value
                                                       )
                                                  }
                                                  type="text"
                                                  placeholder={searchPlacholder}
                                             />
                                        </Form.Group>
                                   </Col>
                                   <Col>
                                        <Button
                                             size="sm"
                                             variant="success"
                                             type="submit"
                                             className="mb-2"
                                        >
                                             <FaSearch /> Search
                                        </Button>
                                   </Col>
                              </Row>
                         </Form>
                    </Col>
                    <Col>{renderCustomFilterPlugins()}</Col>
                    <Col className="align-self-end">{customPanel}</Col>
               </Row>
               <Table striped borderless size="md" hover variant="light">
                    <thead>
                         <tr>
                              {columns.map((column, index) => {
                                   const sortOrder = sorts.find(
                                        (value) => value[column.index]
                                   );

                                   return (
                                        <RenderColumn
                                             column={column}
                                             key={`column-${index}`}
                                             onClickSort={(value) =>
                                                  setFilterSort(value)
                                             }
                                             sortOrder={
                                                  sortOrder?.[column.index]
                                             }
                                        />
                                   );
                              })}
                         </tr>
                    </thead>
                    <tbody>
                         {loading ? (
                              <>
                                   <tr>
                                        <td colSpan={columns.length}>
                                             <div className="d-flex flex-row justify-content-center">
                                                  <Spinner animation="grow" />
                                             </div>
                                        </td>
                                   </tr>
                              </>
                         ) : (
                              <>
                                   {sourceData.length > 0 ? (
                                        sourceData.map((course, index) => (
                                             <RenderRow
                                                  key={`row-${index}`}
                                                  index={index}
                                                  columns={columns}
                                                  data={course}
                                                  renderRecord={renderRecord}
                                             />
                                        ))
                                   ) : (
                                        <tr>
                                             <td
                                                  colSpan={columns.length}
                                                  className="text-center"
                                             >
                                                  No data found
                                             </td>
                                        </tr>
                                   )}
                              </>
                         )}
                    </tbody>
               </Table>
               <Row>
                    <Col>
                         <DatatablePagination
                              totalCount={totalCount}
                              pageSize={query.limit}
                              siblingCount={siblingCount}
                              currentPage={currentPage}
                              onPageChange={(page) => setPageQuery(page)}
                         />
                    </Col>
                    <Col lg={3}>
                         <Form.Group
                              className="d-flex flex-row justify-content-end"
                              controlId="formSearch"
                         >
                              <Form.Select
                                   size="sm"
                                   aria-label="Default select example"
                                   onChange={(e) =>
                                        setLimitQuery(e.target.value)
                                   }
                              >
                                   <option value={8}>Show Page 1 - 8</option>
                                   {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
                                        <React.Fragment key={number}>
                                             <option value={number}>
                                                  {number}
                                             </option>
                                        </React.Fragment>
                                   ))}
                              </Form.Select>
                         </Form.Group>
                    </Col>
               </Row>
          </>
     );
};

const RenderColumn = ({ column, onClickSort, sortOrder }) => {
     const renderSortIcon = sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />;

     return (
          <th>
               <div
                    className="d-flex gap-2 align-items-center h-100"
                    style={{ cursor: "pointer" }}
                    onClick={() => column.sort && onClickSort(column.index)}
               >
                    {column.sort && renderSortIcon}
                    <span>{column.label}</span>
               </div>
          </th>
     );
};

const RenderRow = ({ index, columns, data, renderRecord }) => {
     return (
          <tr>
               {columns.map(({ render }, columnIndex) => {
                    const { record, value } = renderRecord(data, columnIndex);

                    return (
                         <td key={`field-${columnIndex}`}>
                              {render(record, value, index)}
                         </td>
                    );
               })}
          </tr>
     );
};

const DatatablePagination = ({
     size = "sm",
     totalCount,
     pageSize,
     siblingCount,
     currentPage = 1,
     onPageChange,
}) => {
     const paginationRange = usePagination({
          totalCount,
          siblingCount,
          currentPage,
          pageSize,
     });

     const onNext = () => {
          onPageChange(currentPage + 1);
     };

     const onPrevious = () => {
          onPageChange(currentPage - 1);
     };

     let lastPage = paginationRange[paginationRange.length - 1];

     return (
          <Pagination size={size}>
               <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={onPrevious}
               />
               {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === "....") {
                         return (
                              <Pagination.Ellipsis
                                   key={`pagination-ellipsis-${index}`}
                              />
                         );
                    }

                    return (
                         <Pagination.Item
                              key={`pagination-item-${index}`}
                              active={currentPage === pageNumber}
                              onClick={() => onPageChange(pageNumber)}
                         >
                              {pageNumber}
                         </Pagination.Item>
                    );
               })}
               <Pagination.Next
                    onClick={onNext}
                    disabled={currentPage === lastPage}
               />
          </Pagination>
     );
};

export default Datatable;
