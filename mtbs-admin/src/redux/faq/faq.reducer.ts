import { PayloadAction } from '@reduxjs/toolkit';
import { Faq } from '../../types/types';
import { FaqState } from './faq.slice';

const reducers = {
  setFaq: (state: FaqState, action: PayloadAction<Faq | null>) => {
    state.faq = action.payload;
    return state;
  },
  setFaqs: (state: FaqState, action: PayloadAction<Faq[]>) => {
    state.faqList = action.payload;
    return state;
  },
};

export default reducers;
