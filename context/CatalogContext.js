import { useContext, useReducer, createContext } from 'react';

export const CatalogContext = createContext();

const initialCatalog = {
  global: [],
  current: [],
  lastUpdated: '',
  filters: {
    search: '',
    category: '',
    brand: '',
  },
};

const applyFilters = (products, search = '', brand = '', category = '') => {
  let filteredProducts = products.filter((product) => {
    let filteredBySearch = false;
    if (search !== '' && product.eBayTopTitle) {
      filteredBySearch = product.eBayTopTitle
        .toLowerCase()
        .includes(search.toLowerCase());
    }

    return filteredBySearch || search === '';
  });

  if (brand !== '') {
    console.log('BEFORE FILTER', filteredProducts.length);
    filteredProducts = filteredProducts.filter((product) => {
      return product.BrandID === brand;
    });
  }

  return filteredProducts;
};

const removeFilters = (products, filters, filterToRemove) => {
  const filteredProducts = products.filter((product) => {
    let filteredBySearch = true;
    if (filters.search !== '' && filterToRemove !== 'search') {
      filteredBySearch = product.eBayTopTitle
        .toLowerCase()
        .includes(search.toLowerCase());
    }

    const filtersApplied = filteredBySearch || filters.search !== '';

    return filtersApplied;
  });

  return filteredProducts;
};

const catalogReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_CATALOG':
      let { catalog, lastUpdated } = action;

      //Sorts products alphabetically
      catalog.sort((firstProduct, secondProduct) => {
        if (firstProduct.eBayTopTitle < secondProduct.eBayTopTitle) return -1;
        else if (firstProduct.eBayTopTitle < secondProduct.eBayTopTitle) return 1;

        return 0;
      });

      //TODO - esta linea filtra el catalogo para que solo muestre los productos
      //donde (on order + physicalQty) sean  > 0
      catalog = catalog.filter(product => (product.PhysicalQty + product.OnOrder) > 0)
      

      return {
        global: catalog,
        current: catalog,
        lastUpdated,
        filters: {
          search: '',
          category: '',
          brand: '',
        },
      };
    case 'APPLY_FILTERS': {
      const { search, brand } = action;

      const filteredProducts = applyFilters(state.global, search, brand);

      return {
        ...state,
        current: filteredProducts,
        filters: {
          ...state.filters,
          search,
          brand,
        },
      };
    }
    case 'REMOVE_FILTERS': {
      const { filter, filtersApplied } = action;

      const filteredProducts = removeFilters(
        state.global,
        filtersApplied,
        filter
      );

      return {
        ...state,
        current: filteredProducts,
        filters: {
          ...state.filters,
          [filter]: '',
        },
      };
    }
  }
};

const CatalogContextProvider = ({ children }) => {
  const [catalogState, dispatchCatalog] = useReducer(
    catalogReducer,
    initialCatalog
  );

  return (
    <CatalogContext.Provider value={{ catalogState, dispatchCatalog }}>
      {children}
    </CatalogContext.Provider>
  );
};

export default CatalogContextProvider;
