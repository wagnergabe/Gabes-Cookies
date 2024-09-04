import { COOKIES_URL } from '../src/constants.js';
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
            query: (cookieId) => ({
                url: `${COOKIES_URL}/${cookieId}`,
            }),
            keepUnusedDataFor: 5,
        })
    })
});

export const { useGetCookiesQuery, useGetCookieDetailsQuery } = cookiesApiSlice;