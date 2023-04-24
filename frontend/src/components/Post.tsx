export type PostType = {
  id: number;
  title: string;
  status: string;
  content: string;
  thumbnail: string;
};

type Props = {
  post: PostType;
};

export function Post({ post }: Props) {
  return (
    <div>
      <h3>
        #{post.id} {post.title}
      </h3>
      <p>{post.status}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </div>
  );
}
