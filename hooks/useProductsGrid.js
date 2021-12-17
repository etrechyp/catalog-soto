import { useEffect, useContext, useState } from 'react';
import { CatalogContext } from '../context/CatalogContext';
import useModal from '../hooks/useModal';
import { getAllProducts } from '../helper';
import usePagination from '../hooks/usePagination';

const useProductsGrid = () => {
  const { open, handleOpen, handleClose } = useModal();
  const { catalogState, dispatchCatalog } = useContext(CatalogContext);
  const { current: currentCatalog } = catalogState;
  const { pagination, pageSize, updatePaginationData, handlePaginationChange } =
    usePagination(currentCatalog);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { pages, currentPage } = pagination;

  const initCatalog = async () => {
    const catalogData = await getAllProducts(); 

    dispatchCatalog({
      type: 'INIT_CATALOG',
      catalog: catalogData.catalog,
      lastUpdated: catalogData.lastUpdated,
    });
  };

  useEffect(() => {
    initCatalog();
  }, []);

  useEffect(() => {
    if (currentCatalog.length > 0) {
      updatePaginationData(currentCatalog);
    }
  }, [currentCatalog]);

  return {
    open,
    handleOpen,
    selectedProduct,
    setSelectedProduct,
    handleClose,
    currentCatalog,
    pages,
    currentPage,
    handlePaginationChange,
    pageSize,
  };
};

export default useProductsGrid;
