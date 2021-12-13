import { useContext, useReducer, createContext } from 'react';

export const CatalogContext = createContext();

const initialCatalog = {
  global: [],
  current: [],
  filters: {
    search: '',
    category: '',
    brand: '',
  },
};

const applyFilters = (products, search = '', brand = '', category = '') => {
  const filteredProducts = products.filter((product) => {
    let filteredBySearch = false;
    if (search !== '') {
      filteredBySearch = product.eBayTopTitle
        .toLowerCase()
        .includes(search.toLowerCase());
    }

    const filtersApplied = (filteredBySearch || search === "");

    return filtersApplied;
  });

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

    const filtersApplied = (filteredBySearch || filters.search !== "");

    return filtersApplied;
  });

  return filteredProducts;
};

const catalogReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_CATALOG':
      const { catalog } = action;

      return {
        global: catalog,
        current: catalog,
        filters: {
          search: '',
          category: '',
          brand: '',
        },
      };
    case 'APPLY_FILTERS': {
      const { search } = action;

      const filteredProducts = applyFilters(state.global, search);

      return {
        ...state,
        current: filteredProducts,
        filters: {
          ...state.filters,
          search,
        },
      };
    }
    case 'REMOVE_FILTERS': {
      const { filter, filtersApplied } = action;

      const filteredProducts = removeFilters(state.global, filtersApplied, filter);

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
