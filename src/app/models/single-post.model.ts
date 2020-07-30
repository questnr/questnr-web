import { MetaTagCard } from './common.model';
import { Post } from './post-action.model';

export class SinglePost extends Post {
    metaTagCard: MetaTagCard;
    title: string;
}