import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { Context } from '../index';
import { Pagination } from 'react-bootstrap';
import './style/styleForComponent.css';

const Pages = observer(() => {
    const { device } = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const currentPage = device.page;

    const handlePageClick = (page) => {
        device.setPage(page);
    };

    const renderPages = () => {
        const pages = [];

        for (let i = 1; i <= pageCount; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        return pages;
    };

    return (
        <Pagination className="mt-3 display-flex justify-content-center">
            {renderPages()}
        </Pagination>
    );
});

export default Pages;
