export interface AuthInitialState {
  user: SignInResponse | null;
  isSignInLoading: boolean;
  isSignUpLoading: boolean;
  isUserUpdateLoading: boolean;
  signInError: any;
  signUpError: any;
  userUpdateError: any;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  createdAt: string;
  email: string;
  password: string;
  profilePic: string;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
}

export interface SignUpRequest extends SignInRequest {
  email: string;
}

export type UpdateUserRequest = Partial<SignUpRequest> & {
  userId: string;
  profilePic?: string;
};
