export type SignInData = { email: string; password: string };

export type SignUpData = SignInData & { group: string };

export type UserType = {
  name: string;
  about: string;
  avatar: string;
  isAdmin: boolean;
  id: string;
  email: string;
  group: string;
};

export type CommentType = {
  author: string;
  created_at: string;
  post: string;
  text: string;
  updated_at: string;
  id: string;
};

export type SignInResponse = { data: UserType; token: string };

export type PostType = {
  author: Omit<UserType, "group" | "isAdmin">;
  comments: Array<CommentType>;
  created_at: string;
  image: string;
  isPublished: boolean;
  likes: Array<string>;
  tags: Array<string>;
  text: string;
  title: string;
  updated_at: string;
  id: string;
};

export type PostEditForm = {
  title: string;
  text: string;
  image: string;
  tags: Array<string>;
};

export type RecoverResponse = { message: string };
