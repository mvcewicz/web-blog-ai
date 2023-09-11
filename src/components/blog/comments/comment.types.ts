export type Comment = {
  id: string;
  parentId?: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  votes: {
    up: number;
    down: number;
  };
  createdAt: string;
  replies?: Comment[];
  repliesCount?: number;
};
