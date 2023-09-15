export type Comment = {
  id: string;
  parentId?: string;
  user: {
    name: string;
    image: string;
  };
  content: string;
  votes: {
    up: number;
    down: number;
  };
  createdAt: string;
  replies?: Comment[];
  replyCount?: number;
};
