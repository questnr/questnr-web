import { Routes } from '@angular/router';
import { SinglePostComponent } from './single-post.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { PostNotFoundComponent } from './post-not-found/post-not-found.component';

export const componentDeclarations: any[] = [
    SinglePostComponent,
    NotAuthorizedComponent,
    PostNotFoundComponent
];

export const providerDeclarations: any[] = [
];

export const routes: Routes = [
    {
        path: '',
        component: SinglePostComponent
    }
];
