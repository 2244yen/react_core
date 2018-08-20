import React, { Component } from 'react';

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";

const range = (from, to, step = 1) => {
    let i = from;
    let rangeArr = [];
    while (i <= to) {
        rangeArr.push(i);
        i = i + step;
    } 
    return rangeArr;
}

class Pagination extends Component {
    constructor (props) {
        super(props);
        const { totalRecords = null, pageLimit = 30, pageNeighbors = 0 } = this.props;
        this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;
        this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30; 
        this.pageNeighbors = typeof pageNeighbors == "number" ? Math.max(0, Math.min(pageNeighbors, 2)) : 0;
        this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);
        this.state = { currentPage : 1 };
    }

    fetchPages () {
        const totalNumber = this.pageNeighbors * 2 + 3;
        const totalBlock = totalNumber + 2;
        const currentPage = this.state.currentPage;
        
        if (this.totalPages > totalBlock) {
            var pages = [];
            const leftBound = currentPage - this.pageNeighbors;
            const rightBound = currentPage + this.pageNeighbors;
            const beforeLastPage = this.totalPages - 1;

            const startPage = leftBound > 2 ? leftBound : 2;
            const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;
            pages = range(startPage, endPage);
            console.log('pages', pages);

            const offset = totalNumber - (pages.length - 1);

            const leftSpill = leftBound > 2;
            const rightSpill = rightBound < beforeLastPage;

            if (leftSpill && !rightSpill) {
                const extraPages = range(startPage - offset, startPage -1);
                pages = [LEFT_PAGE, ...extraPages, ...pages];
            }

            if (!leftSpill && rightSpill) {
                const extraPages = range(endPage + 1, endPage + offset );
                pages = [...pages, ...extraPages, RIGHT_PAGE];
            }

            if (leftSpill && rightSpill) {
                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
            }
            return [1, ...pages, this.totalPages];
        }
        return range(1, this.totalPages);
    }

    gotoPage (page) {
        this.setState({ currentPage: page});
        this.props.goChangedPage(page);
    }

    handleClick (page, evt) {
        evt.preventDefault();
        const currentPage = this.state.currentPage;
        if (page === LEFT_PAGE) {
            page = currentPage - 1;
        }
        if (page === RIGHT_PAGE) {
            page = currentPage + 1;
        }
        this.gotoPage(page);
    }

    render () {
        const pages = this.fetchPages();
        console.log(pages);
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {
                        pages.map((page, item) => {
                            if (page === LEFT_PAGE) {
                                return (
                                    <li key={item} className="page-item" onClick={ e => this.handleClick(page, e) }>
                                        <a className="page-link" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                );
                            }
                            if (page === RIGHT_PAGE) {
                                return (
                                    <li key={item} className="page-item" onClick={ e => this.handleClick(page, e) }>
                                        <a className="page-link" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                );
                            }
                            return (
                                <li key={item} className="page-item" onClick={ e => this.handleClick(page, e) }><a className="page-link">{ page }</a></li>
                            );
                        })
                    }
                </ul>
            </nav>
        );
    }
}

export default Pagination;