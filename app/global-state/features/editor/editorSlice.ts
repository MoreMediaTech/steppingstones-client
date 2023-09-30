import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

import {
  DistrictDataProps,
  DistrictSectionProps,
  EconomicDataWidgetProps,
  SectionProps,
  SubSectionProps,
  SubSubSectionProps,
  SourceDataProps,
  PartnerData,
} from '../../../../lib/types'
import { RootState } from 'app/global-state/store'
import { CountyDataProps, Error } from '@lib/types'
import { CountySchemaProps } from '@models/County'

interface IEditorState {
  publicFeed: Pick<CountySchemaProps, 'id' | 'name' | 'imageUrl' | 'logoIcon'>[]
  counties: Partial<CountySchemaProps[]> | null
  district: Partial<DistrictDataProps> | null
  county: Partial<CountyDataProps> | null
  section: Partial<SectionProps> | null
  subSection: Partial<SubSectionProps> | null
  subSubSection: Partial<SubSubSectionProps> | null
  districtSection: Partial<DistrictSectionProps> | null
  economicData: Partial<EconomicDataWidgetProps> | null
  sdData: Partial<SourceDataProps> | null
  partner: Partial<PartnerData> | null
  openEditModal: boolean
  openDeleteModal: boolean
  openLASectionModal: boolean
  openSubSectionModal: boolean
  type: 'Create' | 'Update'
  message: string
  sectionType: string
  error: Error | null
}

export const initialState: IEditorState = {
  counties: [],
  publicFeed: [],
  district: null,
  county: null,
  section: null,
  subSection: null,
  subSubSection: null,
  districtSection: null,
  economicData: null,
  sdData: null,
  partner: null,
  sectionType: 'Section',
  openEditModal: false,
  openDeleteModal: false,
  openLASectionModal: false,
  openSubSectionModal: false,
  type: 'Create',
  message: '',
  error: { message: 'An Error occurred' },
}

export const fetchPublicFeed = createAsyncThunk(
  'editor/fetchPublicFeed',
  async (): Promise<
    Pick<CountySchemaProps, 'id' | 'name' | 'imageUrl' | 'logoIcon'>[]
  > => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feed`)
    const data = await res.json()
    return data.counties
  }
)

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setCounties: (state, { payload }: PayloadAction<CountySchemaProps[]>) => {
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
    setPartner: (
      state,
      { payload }: PayloadAction<PartnerData | null>
    ) => {
      state.partner = payload
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
    setType: (state, { payload }: PayloadAction<'Create' | 'Update'>) => {
      state.type = payload
    },
    setError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload
    },
    clearState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPublicFeed.fulfilled, (state, { payload }) => {
      state.publicFeed = payload
    })
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
  setPartner,
  setSectionType,
  setOpenEditModal,
  setOpenDeleteModal,
  setOpenLASectionModal,
  setOpenSubSectionModal,
  setType,
} = editorSlice.actions
export const editorSelector = (state: RootState) => state.editor
export default editorSlice.reducer
