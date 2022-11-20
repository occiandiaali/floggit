import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://dummyjson.com/'}),
  endpoints: builder => ({
    getAllProducts: builder.query({
      query: () => 'products?limit=15',
      keepUnusedDataFor: 5,
    }),
    getProduct: builder.query({
      query: product => `products/search?q=${product}&limit=10`,
    }),
  }),
});

export const {useGetAllProductsQuery, useGetProductQuery} = productsApi;
