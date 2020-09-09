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