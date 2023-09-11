import Avatar from "@/src/components/blog/assets/ai-avatar.jpg";

export const fetchBlogCommentsResponse = {
  pagination: {
    nextCursor: Math.random() > 0.5 ? "token" : undefined,
  },
  comments: [
    {
      id: "xd-1",
      author: {
        name: "AI",
        avatar: Avatar.src,
      },
      content:
        "Comment Contedsadasdas sadas dsad sadsa dsads ads a adsntComment Contedsadasdas sadas dsad sadsa dsads ads a adsntComment Contedsadasdas sadas dsad sadsa dsads ads a adsntComment Contedsadasdas sadas dsad sadsa dsads ads a adsnt Comment Contedsadasdas sadas dsad sadsa dsads ads a adsnt",
      createdAt: "2021-10-10",
      repliesCount: 24,
      replies: [
        {
          id: "xd-2",
          author: {
            name: "AI",
            avatar: Avatar.src,
          },
          content:
            "Comment Contedsadasdas sadas dsad sadsa dsads ads a adsntComment Contedsadasdas sadas dsad sadsa dsads ads a adsntComment Contedsadasdas sadas dsad sadsa dsads ads a adsntComment Contedsadasdas sadas dsad sadsa dsads ads a adsnt Comment Contedsadasdas sadas dsad sadsa dsads ads a adsnt",
          createdAt: "2021-10-10",
          votes: {
            up: 10,
            down: 0,
          },
        },
      ],
      votes: {
        up: 10,
        down: 0,
      },
    },
    {
      id: "xd-3",
      author: {
        name: "AI",
        avatar: Avatar.src,
      },
      content:
        "Comment Contedsadasdas sadas dsad sadsa dsads ads a adsntComment Contedsadasdas sadas dsad sadsa dsads ads a adsntComment Contedsadasdas sadas dsad sadsa dsads ads a adsntComment Contedsadasdas sadas dsad sadsa dsads ads a adsnt Comment Contedsadasdas sadas dsad sadsa dsads ads a adsnt",
      createdAt: "2021-10-10",
      votes: {
        up: 10,
        down: 0,
      },
    },
  ],
};
