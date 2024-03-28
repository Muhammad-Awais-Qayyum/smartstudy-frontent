import { apiSlice } from "../api/apiSlice";


export const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLayout: builder.query({
            query: (type) => ({
                url: `get-layout/${type}`,
                method: 'GET',
                credentials: 'include',
            })
        }),
        createLayout: builder.mutation({
            query: ({type, image, title, subTitle, faq, categories}) => ({
                url: `create-layout`,
                method: 'POST',
                body:{type, image, title, subTitle, faq, categories},
                credentials: 'include',
            })
        }),
        editLayout: builder.mutation({
            query: ({ type, image, title, subTitle, faq, categories }) => ({
                url: 'edit-layout',
                method: 'PUT',
                body: { type, image, title, subTitle, faq, categories },
                credentials: 'include' as const,
            })
        })
    })
})

export const { useGetLayoutQuery, useEditLayoutMutation,useCreateLayoutMutation } = layoutApi;

