export interface PostInitialState {
  post: PostResponse | null;
  isFetching: boolean;
  error: any;
}

export interface PostResponse {
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

export interface UpdatePostRequest {
  id: string;
  title: string;
  desc: string;
}

export interface CreatePostRequest {
  title: string;
  desc: string;
  photo?: string;
}
