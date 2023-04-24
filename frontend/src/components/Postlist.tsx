import { useEffect, useState } from "react";
import { Directus } from "@directus/sdk";
import { Post, PostType } from "./Post";

type Props = {
  apiUrl: string;
};

async function loadPosts(url: string): Promise<PostType[]> {
  console.debug(`Loading posts from ${url}`);

  const directus = new Directus(url);
  const response = await directus
    .items<"posts", PostType>("posts")
    .readByQuery({});

  console.debug(`Loaded ${response.data?.length || 0} posts`);
  return response.data || [];
}

export function PostList({ apiUrl }: Props) {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    console.debug("Calling loadPosts");
    loadPosts(apiUrl).then(setPosts).catch(console.error);
  }, []);

  if (!posts.length) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
