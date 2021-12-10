import { useState } from 'react';

const usePagination = (items) => {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    total: items.length,
    pages: Math.ceil(items.length / pageSize),
    currentPage: 1,
  });

  const handlePaginationChange = (event, value) => {
    setPagination({
      ...pagination,
      currentPage: value,
    });
  };

  const updatePaginationData = (items) => {
    setPagination({
      total: items.length,
      pages: Math.ceil(items.length / pageSize),
      currentPage: 1,
    });
  };

  return {
    pagination,
    pageSize,
    handlePaginationChange,
    updatePaginationData,
  };
};

export default usePagination;
