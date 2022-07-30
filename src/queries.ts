export const CORE_BLOG_FIELDS = `
  fragment BlogParts on Blog {
    id
    title
    stage
    createdAt
    excerpt
    views
    content {
      html
    }
    author {
      firstName
      lastName
      slug
      avatar {
        url
      }
    }
    seo
    slug
    id
    coverImage {
      thumbnail: url(
        transformation: {
          image: { resize: { width: 240, height: 160 } }
          document: { output: { format: png } }
        }
      )
      medium: url(
        transformation: {
          image: { resize: { width: 320, height: 240 } }
          document: { output: { format: png } }
        }
      )
      url(transformation: { document: { output: { format: png } } })
    }
    tags
    categories {
      name
      slug
      id
    }
  }
`;

export const BLOG_QUERY = `
  ${CORE_BLOG_FIELDS}
  query BlogQuery($first: Int!, $after: String) {
    categories {
      name
      id
      slug
    }
    blogsConnection(first: $first, after: $after) {
      edges {
        cursor
        node {
          ...BlogParts
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        pageSize
      }
    }
  }
`;

export const TODAY_PICK_QUERY = `
  query TodayPickQuery {
    blogs(where: { isTodaysPick: true }) {
      title
    }
  }
`;

export const ARTICLE_QUERY = `
  ${CORE_BLOG_FIELDS}
  query ArticleQuery($slug: String!) {
    categories {
      name
      id
    }
    blog(where: { slug: $slug }) {
      ...BlogParts
      author {
        recentPosts: blogs(
          where: { NOT: { slug: $slug } }
          orderBy: publishedAt_ASC
          first: 3
        ) {
          title
          slug
          publishedAt
          excerpt
        }
      }
    }
  }
`;

export const UPDATE_BLOG_VIEWS = `
  mutation UpdateBlogViews($slug: String!, $views: Int!) {
    updateBlog(where: { slug: $slug }, data: { views: $views }) {
      views
    }
    publishBlog(where: { slug: $slug }, to: PUBLISHED) {
      slug
    }
  }
`;

export const BLOG_ON_CATEGORY_QUERY = `
  ${CORE_BLOG_FIELDS}
  query BlogOnCategoryQuery($first: Int!, $after: String, $slug: String!) {
    categories {
      name
      id
      slug
    }
    blogsConnection(
      first: $first
      after: $after
      where: { categories_every: { slug: $slug } }
      orderBy: createdAt_DESC
    ) {
      edges {
        cursor
        node {
          ...BlogParts
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        pageSize
      }
    }
  }
`;

export const BLOG_ON_AUTHOR_QUERY = `
  ${CORE_BLOG_FIELDS}
  query BlogOnAuthorQuery($first: Int!, $after: String, $slug: String!) {
    categories {
      name
      id
      slug
    }
    author(where: { slug: $slug }) {
      firstName
      lastName
      slug
      avatar {
        url
      }
    }
    blogsConnection(
      first: $first
      after: $after
      where: { author: { slug: $slug } }
      orderBy: createdAt_DESC
    ) {
      edges {
        cursor
        node {
          ...BlogParts
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
        pageSize
      }
    }
  }
`;

export const HOME_PAGE_QUERY = `
  ${CORE_BLOG_FIELDS}
  query HomepageQuery($first: Int!) {
    categories {
      name
      id
      slug
      image {
        url
      }
    }
    blogs(first: $first, orderBy: createdAt_DESC) {
      ...BlogParts
    }
  }
`;

export const HOME_TRENDING_QUERY = `
  ${CORE_BLOG_FIELDS}
  query HomepageTrandingQuery($ids: [ID!]!) {
    blogs(orderBy: views_DESC, where: { id_not_in: $ids }) {
      ...BlogParts
    }
  }
`;
