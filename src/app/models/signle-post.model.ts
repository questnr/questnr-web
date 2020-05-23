import { MetaList } from './common.model';
import { Post } from './post-action.model';

export class SinglePost extends Post {
    metaList: MetaList[];
    title: string;
}