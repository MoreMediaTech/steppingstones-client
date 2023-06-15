import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import {
  DistrictDataProps,
  DistrictSectionProps,
  EconomicDataWidgetProps,
  SectionProps,
  SubSectionProps,
  SubSubSectionProps,
  SourceDataProps,
} from '../../../../lib/types'
import { RootState } from 'app/global-state/store'
import { CountyDataProps, Error } from '@lib/types'

interface IEditorState {
  counties: Partial<CountyDataProps[]> | null
  district: Partial<DistrictDataProps> | null
  county: Partial<CountyDataProps> | null
  section: Partial<SectionProps> | null
  subSection: Partial<SubSectionProps> | null
  subSubSection: Partial<SubSubSectionProps> | null
  districtSection: Partial<DistrictSectionProps> | null
  economicData: Partial<EconomicDataWidgetProps> | null
  sdData: Partial<SourceDataProps> | null
  openEditModal: boolean
  openDeleteModal: boolean
  openLASectionModal: boolean
  openSubSectionModal: boolean
  message: string
  sectionType: string
  error: Error | null
}

export const initialState: IEditorState = {
  counties: [],
  district: null,
  county: null,
  section: null,
  subSection: null,
  subSubSection: null,
  districtSection: null,
  economicData: null,
  sdData: null,
  sectionType: 'Section',
  openEditModal: false,
  openDeleteModal: false,
  openLASectionModal: false,
  openSubSectionModal: false,
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
    setCounty: (state, { payload }: PayloadAction<CountyDataProps | null>) => {
      state.county = payload
    },
    setDistrict: (
      state,
      { payload }: PayloadAction<DistrictDataProps | null>
    ) => {
      state.district = payload
    },
    setSection: (state, { payload }: PayloadAction<SectionProps | null>) => {
      state.section = payload
    },
    setSubSection: (
      state,
      { payload }: PayloadAction<SubSectionProps | null>
    ) => {
      state.subSection = payload
    },
    setSubSubSection: (
      state,
      { payload }: PayloadAction<SubSubSectionProps | null>
    ) => {
      state.subSubSection = payload
    },
    setDistrictSection: (
      state,
      { payload }: PayloadAction<DistrictSectionProps | null>
    ) => {
      state.districtSection = payload
    },
    setEconomicData: (
      state,
      { payload }: PayloadAction<EconomicDataWidgetProps | null>
    ) => {
      state.economicData = payload
    },
    setSDData: (state, { payload }: PayloadAction<SourceDataProps | null>) => {
      state.sdData = payload
    },
    setSectionType: (
      state,
      { payload }: PayloadAction<'Section' | 'SubSection'>
    ) => {
      state.sectionType = payload
    },
    setOpenEditModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openEditModal = payload
    },
    setOpenDeleteModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openDeleteModal = payload
    },
    setOpenLASectionModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openLASectionModal = payload
    },
    setOpenSubSectionModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openSubSectionModal = payload
    },
    setError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload
    },
    clearState: (state) => initialState,
  },
})

export const {
  setCounties,
  setCounty,
  setDistrict,
  setSection,
  setSubSection,
  setSubSubSection,
  setError,
  clearState,
  setDistrictSection,
  setEconomicData,
  setSDData,
  setSectionType,
  setOpenEditModal,
  setOpenDeleteModal,
  setOpenLASectionModal,
  setOpenSubSectionModal,
} = editorSlice.actions
export const editorSelector = (state: RootState) => state.editor
export default editorSlice.reducer
