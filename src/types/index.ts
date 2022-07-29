export interface Root {
  blogsConnection: BlogsConnection;
}

export interface BlogsConnection {
  edges: Edge[];
  pageInfo: PageInfo;
}

export interface Edge {
  cursor: string;
  node: Blog;
}

export interface Blog {
  id: string;
  title: string;
  stage: string;
  createdAt: string;
  excerpt: string;
  content: Content;
  author: Author;
  isFeatured: boolean;
  seo: string;
  slug: string;
  coverImage: CoverImage;
  tags: string[];
  categories: Category[];
  views: number;
}

export interface Content {
  html: string;
}

export interface Author {
  firstName: string;
  lastName: string;
  avatar: Avatar;
  recentPosts: Blog[];
  slug: string;
}

export interface Avatar {
  url: string;
}

export interface CoverImage {
  thumbnail?: string;
  url: string;
  medium?: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
  pageSize: number;
}

export interface Category {
  name: string;
  id: string;
  slug: string;
  image: CoverImage;
}
