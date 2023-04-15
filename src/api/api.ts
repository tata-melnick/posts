import {
  SignInResponse,
  SignUpData,
  SignInData,
  UserType,
  PostType,
  RecoverResponse,
  PostEditForm,
  CommentType,
} from "./types";
import { TOKEN } from "../constants";

type OptionsType = {
  baseUrl: string;
  groupId: string;
};

class API {
  static options: OptionsType = {
    baseUrl: "https://api.react-learning.ru",
    groupId: "/v2/group-10",
  };

  static async SignUp(data: SignUpData): Promise<UserType> {
    const response = await fetch(`${this.options.baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  static async SignIn(data: SignInData): Promise<SignInResponse> {
    const response = await fetch(`${this.options.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  static async GetUserInfo(): Promise<UserType> {
    const token = window.sessionStorage.getItem(TOKEN);
    const response = await fetch(`${this.options.baseUrl}${this.options.groupId}/users/me`, {
      method: "GET",
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();
    // eslint-disable-next-line no-underscore-dangle
    return { ...user, id: user._id };
  }

  static async GetUsersInfo(): Promise<Array<UserType>> {
    const token = window.sessionStorage.getItem(TOKEN);
    const response = await fetch(`${this.options.baseUrl}${this.options.groupId}/users`, {
      method: "GET",
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
    });
    const users = await response.json();
    // eslint-disable-next-line no-underscore-dangle
    return users.map((el) => ({ ...el, id: el._id }));
  }

  static async Recover(email: string): Promise<RecoverResponse> {
    const response = await fetch(`${this.options.baseUrl}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    return response.json();
  }

  static async ResetPass(token: string, password: string): Promise<SignInResponse> {
    const response = await fetch(`${this.options.baseUrl}/password-reset/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    return response.json();
  }

  static async GetPosts(): Promise<Array<PostType>> {
    const { baseUrl, groupId } = this.options;
    const token = window.sessionStorage.getItem(TOKEN);
    const response = await fetch(`${baseUrl}${groupId}/posts`, {
      method: "GET",
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
    });
    const posts = await response.json();
    return posts.map((post) => ({
      ...post,
      // eslint-disable-next-line no-underscore-dangle
      id: post._id,
      // eslint-disable-next-line no-underscore-dangle
      author: { ...post.author, id: post.author._id },
    }));
  }

  static async GetPostById(postId: string): Promise<PostType> {
    const { baseUrl, groupId } = this.options;
    const token = window.sessionStorage.getItem(TOKEN);
    const response = await fetch(`${baseUrl}${groupId}/posts/${postId}`, {
      method: "GET",
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
    });
    const post = await response.json();
    return {
      ...post,
      // eslint-disable-next-line no-underscore-dangle
      id: post._id,
      // eslint-disable-next-line no-underscore-dangle
      comments: post.comments.map((el) => ({ ...el, id: el._id })),
      // eslint-disable-next-line no-underscore-dangle
      author: { ...post.author, id: post.author._id },
    };
  }

  static async GetCommentsByPostId(postId: string): Promise<Array<CommentType>> {
    const { baseUrl, groupId } = this.options;
    const token = window.sessionStorage.getItem(TOKEN);
    const response = await fetch(`${baseUrl}${groupId}/posts/comments/${postId}`, {
      method: "GET",
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
    });
    const comments = await response.json();
    // eslint-disable-next-line no-underscore-dangle
    return comments.map((el) => ({ ...el, id: el._id }));
  }

  static async AddComment(postId: string, text: string): Promise<PostType> {
    const { baseUrl, groupId } = this.options;
    const token = window.sessionStorage.getItem(TOKEN);
    const response = await fetch(`${baseUrl}${groupId}/posts/comments/${postId}`, {
      method: "POST",
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const post = await response.json();
    return {
      ...post,
      // eslint-disable-next-line no-underscore-dangle
      id: post._id,
      // eslint-disable-next-line no-underscore-dangle
      comments: post.comments.map((el) => ({ ...el, id: el._id })),
      // eslint-disable-next-line no-underscore-dangle
      author: { ...post.author, id: post.author._id },
    };
  }

  static async DelComment(postId: string, commentId: string): Promise<PostType> {
    const { baseUrl, groupId } = this.options;
    const token = window.sessionStorage.getItem(TOKEN);
    const response = await fetch(`${baseUrl}${groupId}/posts/comments/${postId}/${commentId}`, {
      method: "DELETE",
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
      },
    });
    const post = await response.json();
    return {
      ...post,
      // eslint-disable-next-line no-underscore-dangle
      id: post._id,
      // eslint-disable-next-line no-underscore-dangle
      comments: post.comments.map((el) => ({ ...el, id: el._id })),
      // eslint-disable-next-line no-underscore-dangle
      author: { ...post.author, id: post.author._id },
    };
  }

  static async ChangeLikePost(postId: string, like): Promise<PostType> {
    const { baseUrl, groupId } = this.options;
    const token = window.sessionStorage.getItem(TOKEN);
    const response = await fetch(`${baseUrl}${groupId}/posts/likes/${postId}`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { authorization: `Bearer ${token}` }),
      },
    });
    return response.json();
  }

  static async CreatePost(data: PostEditForm): Promise<PostType> {
    const { baseUrl, groupId } = this.options;
    const token = window.sessionStorage.getItem(TOKEN);
    const response = await fetch(`${baseUrl}${groupId}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    const post = await response.json();
    return {
      ...post,
      // eslint-disable-next-line no-underscore-dangle
      id: post._id,
      // eslint-disable-next-line no-underscore-dangle
      author: { ...post.author, id: post.author._id },
    };
  }

  static async EditPost(data: PostEditForm, postId: string): Promise<PostType> {
    const { baseUrl, groupId } = this.options;
    const token = window.sessionStorage.getItem(TOKEN);
    const response = await fetch(`${baseUrl}${groupId}/posts/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });
    const post = await response.json();
    return {
      ...post,
      // eslint-disable-next-line no-underscore-dangle
      id: post._id,
      // eslint-disable-next-line no-underscore-dangle
      author: { ...post.author, id: post.author._id },
    };
  }

  static async DeletePost(postId: string): Promise<any> {
    const { baseUrl, groupId } = this.options;
    const token = window.sessionStorage.getItem(TOKEN);
    const response = await fetch(`${baseUrl}${groupId}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { authorization: `Bearer ${token}` }),
      },
    });
    return response.json();
  }
}

export default API;
