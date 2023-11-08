export interface IGame {
  id: number;
  name: string;
  slug: string;
  active: number;
  status: number;
  width: number;
  height: number;
  source_link: string;
  author_id: number;
  description: string;
  type: null;
  thumbnail: string;
  images: null;
  video: string;
  hot: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface ITag {
  id: number;
  name: string;
  slug: string;
}

export interface IGameDetail extends IGame {
  categories: ICategory[];
  tags: ITag[];
}

export interface IPromo {
  hotGame: IGame;
  featureGame: IGame[];
}

export interface IComment {
  id: number;
  game_id: number;
  user_id: number;
  rating: number;
  status: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}
