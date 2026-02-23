import { createSlice } from '@reduxjs/toolkit'

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    productsState: [],
    startingArr: [],
    searchTerm: ''
  },
  reducers: {
    setProducts: (state, action) => {
      state.productsState = action.payload
    },
    setStartingArr: (state, action) => {
      state.startingArr = action.payload
    },
    setLoadMore: (state) => {
      const newArr = state.productsState.slice(state.startingArr.length, state.startingArr.length + 3)
      state.startingArr = [...state.startingArr, ...newArr]
    },
    setSearch: (state, action) => {
      if (state.startingArr.length === 0) {
        state.startingArr = action.payload.slice(0, 3)
      }
      const exactMatch = state.productsState.find((e) =>
        e.title.toLowerCase() === state.searchTerm.toLowerCase()
      );

      const filter = exactMatch
        ? [exactMatch]
        : state.productsState.filter((e) =>
          e.title.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      state.productsState = filter;
      state.startingArr = filter.slice(0, state.startingArr.length)
    },
    sortAsc: (state) => {
      const sorted = state.productsState.slice().sort((a, b) => a.price - b.price)
      state.productsState = sorted;
      state.startingArr = sorted.slice(0, state.startingArr.length)
    },
    sortDesc: (state) => {
      const sorted = state.productsState.slice().sort((a, b) => b.price - a.price)
      state.productsState = sorted;
      state.startingArr = sorted.slice(0, state.startingArr.length)
    },
    setFilter: (state, action) => {
      const { maxInput, allProducts } = action.payload
      if (state.startingArr.length === 0) {
        state.startingArr = allProducts.slice(0, 3)
      }

      const filtered = allProducts.filter((prod) => prod.price <= Number(maxInput));
      state.productsState = filtered
      state.startingArr = filtered.slice(0, 3)
    },

    setReset: (state, action) => {
      state.productsState = action.payload
      state.startingArr = action.payload.slice(0, 3)
      state.searchTerm = ''
    },

    setSearchInput: (state, action) => {
      state.searchTerm = action.payload
    }

  }
})

export const { setProducts, setStartingArr, setLoadMore, setSearch, sortAsc, sortDesc, setFilter, setReset, setSearchInput } = shopSlice.actions
export default shopSlice.reducer