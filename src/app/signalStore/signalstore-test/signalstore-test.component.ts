import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PostsStore } from '../PostsStore';

@Component({
  selector: 'app-signalstore-test',
  standalone: true,
  imports: [CommonModule],
  providers:[PostsStore],
  templateUrl: './signalstore-test.component.html',
  styleUrl: './signalstore-test.component.css'
})
export class SignalstoreTestComponent {
  store = inject(PostsStore);
  posts = this.store.posts;

// Fetch all posts
  post = this.store.post;

  ngOnInit() {
    const postId = 1;
    this.store.getPostById(postId);
  }

}
