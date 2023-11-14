export interface IGameLocal {
  id: number;
  name: string;
  name_vi: string;
  slug: string;
  thumbnail: string;
}

export interface IGame extends IGameLocal {
  active: number;
  status: number;
  width: number;
  height: number;
  source_link: string;
  author_id: number;
  description: string;
  description_vi: string;
  instruction: string;
  instruction_vi: string;
  type: null;
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
  name_vi: string;
  slug: string;
  icon: string;
}

export interface ITag {
  id: number;
  name: string;
  name_vi: string;
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
