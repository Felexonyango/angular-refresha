import { computed, inject, Injectable } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import {tapResponse} from '@ngrx/operators'
import { PostService } from '../service/postservice.service';
type IPostState = {
  posts: any[];
  post: any;
  loading: boolean;
  error: string | null;
};

const initialState: IPostState = {
  posts: [],
  post:{},
  loading: false,
  error: null,
}


export const PostsStore = signalStore(
  withState(initialState),
  withMethods((store, postService = inject(PostService)) => ({
    
    getPosts: rxMethod(() =>
      postService.getPosts().pipe(
        tapResponse({
            next: (posts) => {
                console.log(posts)
              patchState(store, { posts: posts,loading: false  });
            },
            error: (error) => {
            //   patchState(store, { error});
            },
          }),

          )
        ),
    getPostById: rxMethod<number>(
        pipe(
          switchMap((slug) =>
            postService.getpostById(slug).pipe(
              tapResponse({
                next: (post) => {
                    console.log(post,'postId: ')
                  patchState(store, { post: post ,loading: false});
                },
                error: () => {
                
                },
              }),
            ),
          ),
        )
    )

  }))
);
