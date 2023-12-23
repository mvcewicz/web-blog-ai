export type BlogComment = {
  id: string;
  parentId?: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  content: string;
  votes?: {
    up: number;
    down: number;
  };
  createdAt: string;
  replies?: BlogComment[];
  replyCount?: number;
};
