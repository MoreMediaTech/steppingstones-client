import { uploadApiSlice } from 'app/global-state/api/apiSlice'
import { AxiosError } from 'axios'
import { setError, setImageUrl } from './uploadSlice'

type Image = {
  imageUrl: string
}

const uploadApi = uploadApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (data) => ({
        url: '/upload',
        method: 'POST',
        body: { data },
      }),
      invalidatesTags: ['Upload'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setImageUrl(data.imageUrl))
        } catch (error) {
          if (error instanceof AxiosError) {
            dispatch(setError({ message: error.message }))
          }
          dispatch(setError({ message: 'Unable to upload file' }))
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const { useUploadFileMutation } = uploadApi
