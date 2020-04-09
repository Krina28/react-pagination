import React from 'react';

const defaultProps = {
    initialPage: 1,
    pageSize: 10
};

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items > 0) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        const { items, pageSize } = this.props;
        let { pager } = this.state;

        /* if (page < 1 || page > pager.totalPages) {
          return;
        } */

        // get new pager object for specified page
        pager = this.getPager(items, page, pageSize);

        // update state
        this.setState({ pager });

        // call change page function in parent component
        this.props.onChangePage(pager.currentPage);
    }

    getPager = (totalItems, currentPage = 1, pageSize = 10) => {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage;
        let endPage;
        if (totalPages <= 5) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= 2) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

    render() {
        const { pager } = this.state;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className="pagination flex-wrap">
                {
                    pager.currentPage > 3 &&
                    <li className={pager.currentPage === 1 ? 'disabled page-item' : 'page-item'}>
                        <a href="#"

                            onClick={() => this.setPage(pager.currentPage - (pager.currentPage > 3 && pager.currentPage < 6 ? 3 : 5))}
                        >
                            Previous {pager.currentPage > 3 && pager.currentPage < 6 ? 3 : 5}
                        </a>
                    </li>
                }
                {
                    pager.currentPage !== 1 &&
                    <li className={pager.currentPage === 1 ? 'disabled page-item' : 'page-item'}>
                        <a href="#"
                            onClick={() => this.setPage(pager.currentPage - 1)}
                        >
                            Previous
                        </a>
                    </li>
                }
                {pager.pages.map((page, index) => (
                    <li key={index} className={pager.currentPage === page ? 'page-item active' : 'page-item'}>
                        <a style={{ textDecoration: pager.currentPage == page && 'none' }}
                            href="#"
                            onClick={() => this.setPage(page)}
                        >
                            <b>{page}</b>
                        </a>
                    </li>
                ))
                }
                {
                    pager.currentPage !== pager.totalPages &&
                    <li className={pager.currentPage === pager.totalPages ? 'disabled page-item' : 'page-item'}>
                        <button
                            type="button"
                            className="page-link"
                            onClick={() => this.setPage(pager.currentPage + 1)}
                        >
                            Next
            </button>
                    </li>
                }
                {
                    (pager.totalPages - (pager.currentPage + 2)) > 0 &&
                    <li className={pager.currentPage === pager.totalPages ? 'disabled page-item' : 'page-item'}>
                        <button
                            type="button"
                            className="page-link"
                            onClick={() => this.setPage(pager.currentPage + ((pager.totalPages - (pager.currentPage + 4)) > 0 ? 5 : 3))}
                        >
                            Next {(pager.totalPages - (pager.currentPage + 4)) > 0 ? 5 : 3}
                        </button>
                    </li>
                }
            </ul >
        );
    }
}

Pagination.defaultProps = defaultProps;
export default Pagination;