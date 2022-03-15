import { createSlice } from '@reduxjs/toolkit';
import { Faq } from "../../types/types";
import reducers from './faq.reducer';

export interface FaqState {
  faq: Faq | null;
  faqList: Faq[];
};

export const initialState: FaqState = {
  faq: null,
  faqList: [],
};

export const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers,
});

export const {
  setFaq,
  setFaqs,
} = faqSlice.actions;

export default faqSlice.reducer;
