import { COOKIES_URL, UPLOAD_URL } from '../constants';
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
        uploadCookieImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteCookie: builder.mutation({
            query: (id) => ({
                url: `${COOKIES_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});


export const { useGetCookiesQuery, useGetCookieDetailsQuery, useCreateCookieMutation, useUpdateCookieMutation, useUploadCookieImageMutation, useDeleteCookieMutation } = cookiesApiSlice;