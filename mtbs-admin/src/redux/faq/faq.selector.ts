import { createSelector } from 'reselect';
import { RootState } from '../store';

const faq = (state: RootState) => state.faq;

export const selectFaq = createSelector([faq], (faq) => faq.faq);

export const selectFaqList = createSelector([faq], (faq) => faq.faqList);
