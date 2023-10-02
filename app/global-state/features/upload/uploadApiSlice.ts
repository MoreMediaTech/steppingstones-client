import { uploadApiSlice } from 'app/global-state/api/apiSlice'
import { setError, setImageUrl } from './uploadSlice'
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from "@app/global-state/helper";


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
          if (isFetchBaseQueryError(error)) {
            const errMsg =
              "error" in error ? error.error : JSON.stringify(error.message);
           dispatch(setError({ message: errMsg as string }));
          } else if (isErrorWithMessage(error)) {
            dispatch(setError({ message: error.message }));
          } 
          dispatch(setError({ message: 'Unable to upload file' }))
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const { useUploadFileMutation } = uploadApi
