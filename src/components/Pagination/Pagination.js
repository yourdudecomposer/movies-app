import './Pagination.css';
import { Pagination } from 'antd';
import React from 'react';

export default function myPagination(props) {
    const { current, total } = props;
    const change = props.changePage;
    return (
        <Pagination
            className="pagination"
            current={current}
            total={total}
            showSizeChanger={false}
            size="small"
            onChange={change}
        />
    );
}
