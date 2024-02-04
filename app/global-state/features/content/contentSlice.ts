import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "app/global-state/store";
import { Error } from "@lib/types";
import {  FeedContentSchemaProps, PartialFeedContentSchema } from "@models/FeedContent";
import {
  PartialEconomicDataSchemaProps,
  PartialLocalFeedContentSchemaProps,
} from "@models/LocalFeedContent";
import { PartialSectionSchemaProps } from "@models/Section";
import { PartialSourceDirectoryProps } from "@models/SourceDirectory";
import { PartialPartnerWithOrganisationProps } from "@models/Partner";

interface IContentState {
  publicFeed: Pick<
    FeedContentSchemaProps,
    "id" | "name" | "imageUrl" | "logoIcon"
  >[];
  feedContents: PartialFeedContentSchema[] | null;
  localFeed: PartialLocalFeedContentSchemaProps | null;
  feedContent: PartialFeedContentSchema | null;
  section: PartialSectionSchemaProps | null;
  economicData: PartialEconomicDataSchemaProps | null;
  sdData: PartialSourceDirectoryProps | null;
  partner: PartialPartnerWithOrganisationProps | null;
  openEditModal: boolean;
  openDeleteModal: boolean;
  openLASectionModal: boolean;
  openSubSectionModal: boolean;
  type: "Create" | "Update";
  message: string;
  sectionType: string;
  error: Error | null;
}

export const initialState: IContentState = {
  feedContents: [],
  publicFeed: [],
  localFeed: null,
  feedContent: null,
  section: null,
  economicData: null,
  sdData: null,
  partner: null,
  sectionType: "Section",
  openEditModal: false,
  openDeleteModal: false,
  openLASectionModal: false,
  openSubSectionModal: false,
  type: "Create",
  message: "",
  error: { message: "An Error occurred" },
};

export const fetchPublicFeed = createAsyncThunk(
  "editor/fetchPublicFeed",
  async (): Promise<
    Pick<FeedContentSchemaProps, "id" | "name" | "imageUrl" | "logoIcon">[]
  > => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feed`);
    const data = await res.json();
    return data.counties;
  },
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setFeedContents: (
      state,
      { payload }: PayloadAction<PartialFeedContentSchema[]>,
    ) => {
      state.feedContents = payload;
    },
    setFeedContent: (
      state,
      { payload }: PayloadAction<PartialFeedContentSchema | null>,
    ) => {
      state.feedContent = payload;
    },
    setDistrict: (
      state,
      { payload }: PayloadAction<PartialLocalFeedContentSchemaProps | null>,
    ) => {
      state.localFeed = payload;
    },
    setSection: (
      state,
      { payload }: PayloadAction<PartialSectionSchemaProps | null>,
    ) => {
      state.section = payload;
    },
    setEconomicData: (
      state,
      { payload }: PayloadAction<PartialEconomicDataSchemaProps | null>,
    ) => {
      state.economicData = payload;
    },
    setSDData: (
      state,
      { payload }: PayloadAction<PartialSourceDirectoryProps | null>,
    ) => {
      state.sdData = payload;
    },
    setPartner: (
      state,
      { payload }: PayloadAction<PartialPartnerWithOrganisationProps | null>,
    ) => {
      state.partner = payload;
    },
    setSectionType: (
      state,
      { payload }: PayloadAction<"Section" | "SubSection">,
    ) => {
      state.sectionType = payload;
    },
    setOpenEditModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openEditModal = payload;
    },
    setOpenDeleteModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openDeleteModal = payload;
    },
    setOpenLASectionModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openLASectionModal = payload;
    },
    setOpenSubSectionModal: (state, { payload }: PayloadAction<boolean>) => {
      state.openSubSectionModal = payload;
    },
    setType: (state, { payload }: PayloadAction<"Create" | "Update">) => {
      state.type = payload;
    },
    setError: (state, { payload }: PayloadAction<Error>) => {
      state.error = payload;
    },
    clearState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPublicFeed.fulfilled, (state, { payload }) => {
      state.publicFeed = payload;
    });
  },
});

export const {
  setFeedContents,
  setFeedContent,
  setDistrict,
  setSection,
  setError,
  clearState,
  setEconomicData,
  setSDData,
  setPartner,
  setSectionType,
  setOpenEditModal,
  setOpenDeleteModal,
  setOpenLASectionModal,
  setOpenSubSectionModal,
  setType,
} = contentSlice.actions;
export const contentSelector = (state: RootState) => state.content;
export default contentSlice.reducer;
