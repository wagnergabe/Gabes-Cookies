import { COOKIES_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const cookiesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCookies: builder.query({
            query: () => ({
                url: COOKIES_URL,
            }),
            keepUnusedDataFor: 5,
        }),
        getCookieDetails: builder.query({
            query: (id) => ({
                url: `${COOKIES_URL}/${id}`,
        }),
            keepUnusedDataFor: 5,
        }),
    }),
});


export const { useGetCookiesQuery, useGetCookieDetailsQuery } = cookiesApiSlice;