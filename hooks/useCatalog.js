import { useState } from 'react';

const useCatalog = () => {
  const [pagination, setPagination] = useState({
    from: 1,
    limit: 10,
  });
};

export default useCatalog;
