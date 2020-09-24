import { Post } from './post-action.model';
import { User } from './user.model';
export class UserQuestionListModalData {
    user: User;
    questionList: Post[];
    page: number;
    title: string;
    totalCounts?: number;
    isOwner: boolean;
    isEnd: boolean;
}