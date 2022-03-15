import { Faq } from "../../types/types";
import { setFaq, setFaqs } from "./faq.slice";

export function updateFaq(faq: Faq | null) {
  return setFaq(faq);
};

export function setFaqList(faqs: Faq[]) {
  return setFaqs(faqs);
};
