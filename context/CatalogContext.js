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

const catalogReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_CATALOG':
      const { catalog } = action;

      return { global: catalog, current: catalog, filters: [] };
    case 'SEARCH_PRODUCTS':
      const { search } = action;

      const filteredProducts = state.global.filter((product) =>
        product.eBayTopTitle.toLowerCase().includes(search.toLowerCase())
      );

      return {
          ...state,
          current: filteredProducts,
          filters: {
              ...state.filters,
              search              
          }
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
