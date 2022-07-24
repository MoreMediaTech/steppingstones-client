import { DistrictDataProps, EconomicDataWidgetProps, SectionProps, SubSectionProps, SubSubSectionProps } from '../../lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from 'app/store'
import { CountyDataProps, Error } from '@lib/types'

interface IEditorState {
  counties: Partial<CountyDataProps[]>
  district: Partial<DistrictDataProps>
  county: Partial<CountyDataProps>
  section: Partial<SectionProps>
  subSection: Partial<SubSectionProps>
  subSubSection: Partial<SubSubSectionProps>
  economicData: Partial<EconomicDataWidgetProps>
  message: string
  error: Error | null
}

export const initialState: IEditorState = {
  counties: [],
  district: {
    id: '',
    name: '',
    imageUrl: '',
    logoIcon: '',
  },
  county: {
     id: '',
    name: '',
    imageUrl: '',
    logoIcon: '',
  },
  section: {
    id: '',
    name: '',
    title: '',
    content: '',
    isSubSection: false,
  },
  subSection: {
    id: '',
    name: '',
    title: '',
    content: '',
    isSubSubSection: false,
  },
  subSubSection: {
    id: '',
    name: '',
    title: '',
    content: '',
  },
  economicData: {
    id: '',
    title: '',
    stats: '',
    descriptionLine1: '',
    descriptionLine2: '',
    linkName: '',
    linkUrl: '',
    createdAt: '',
    updatedAt: '',
  },
  message: '',
  error: { message: 'An Error occurred' },
}

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCounties: (state, { payload }: PayloadAction<CountyDataProps[]>) => {
      state.counties = payload
    },
    setCounty: (state, { payload }: PayloadAction<CountyDataProps>) => {
      state.county = payload
    },
    setDistrict: (state, { payload }: PayloadAction<DistrictDataProps>) => {
      state.district = payload
    },
    setSection: (state, { payload }: PayloadAction<SectionProps>) => {
      state.section = payload
    },
    setSubSection: (state, { payload }: PayloadAction<SubSectionProps>) => {
      state.subSection = payload
    },
    setSubSubSection: (state, { payload }: PayloadAction<SubSubSectionProps>) => {
      state.subSubSection = payload
    },
    setEconomicData: (state, { payload }: PayloadAction<EconomicDataWidgetProps>) => {
      state.economicData = payload
    },
    setError: (state, { payload }: PayloadAction<AxiosError | Error>) => {
      state.error = payload
    },
    clearState: (state) => initialState,
  },
})

export const { setCounties, setCounty, setDistrict, setSection, setSubSection, setSubSubSection, setError, clearState } =
  editorSlice.actions
export const editorSelector = (state: RootState) => state.editor
export default editorSlice.reducer
