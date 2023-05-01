export interface PostsInitialState {
  posts: PostsResponse;
  isFetching: boolean;
  error: any;
}

export interface Post {
  categories?: Array<string>;
  createdAt: string;
  desc: string;
  photo?: string;
  title: string;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
}

export type PostsResponse = Array<Post>;
