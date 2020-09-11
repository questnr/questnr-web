import { Page } from './page.model';

export class FAQItemPage {
    category: string;
    description: string;
    faqItemPage: Page<FAQItem>;
}

export class FAQItem {
    question: string;
    answer: string;
}

export class FAQClassificationSearchDTO {
    category: string;
    description: string;
    publicId: string;
}

export class FAQItemSearchPage {
    faqClassification: FAQClassificationSearchDTO;
    question: string;
    answer: string;
}

export enum FAQItemType {
    classified = "classified",
    searched = "searched"
}