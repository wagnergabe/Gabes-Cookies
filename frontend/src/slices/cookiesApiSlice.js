import { COOKIES_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const cookiesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCookies: builder.query({
            query: () => ({
                url: COOKIES_URL,
            }),
            providesTags: ['Cookies'],
            keepUnusedDataFor: 5,
        }),
        getCookieDetails: builder.query({
            query: (id) => ({
                url: `${COOKIES_URL}/${id}`,
        }),
            keepUnusedDataFor: 5,
        }),
        createCookie: builder.mutation({
            query: () => ({
                url: COOKIES_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Cookie'],
        }),
        updateCookie: builder.mutation({
            query: ( data ) => ({
                url: `${COOKIES_URL}/${data.cookieId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Cookies'],
        }),
    }),
});


export const { useGetCookiesQuery, useGetCookieDetailsQuery, useCreateCookieMutation, useUpdateCookieMutation } = cookiesApiSlice;