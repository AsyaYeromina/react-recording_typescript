// #region imports
import React, { useState } from "react";

import { Post } from "./types/Post";
import postsFromServer from "./api/posts.json";
import { PostForm } from "./components/PostForm";
import { PostList } from "./components/PostList";
import { getUserById } from "./services/user";
// #endregion
// #region initialPosts


const initialPosts: Post[] = postsFromServer.map((post) => ({
  ...post,
  user: getUserById(post.userId),
}));
// #endregion

function getNewPostId(posts: Post[]) {
  const maxId = Math.max(...posts.map(post => post.id));
  return maxId + 1;
};

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addNewPost = (post: Post) => {
    const newPost = {
      ...post,
      id: getNewPostId(posts),
    };

    setPosts(currentPosts => [...currentPosts, newPost])
  };

  return (
    <div className="section">
      <h1 className="title">Create a post</h1>

      <PostForm onSubmit={addNewPost}/>
      <PostList posts={posts} />
    </div>
  );
};
