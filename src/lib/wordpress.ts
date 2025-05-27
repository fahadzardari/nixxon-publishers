/**
 * Utility functions for fetching data from WordPress API
 */

// Define WordPress post type
export interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: {
      source_url: string;
      alt_text?: string;
    }[];
  };
  categories: number[];
  tags: number[];
  author: number;
}

// Define WordPress category type
export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Define WordPress author type
export interface WordPressAuthor {
  id: number;
  name: string;
  avatar_urls?: {
    [key: string]: string;
  };
}

// Base WordPress API URL - change to your production URL later
const WP_API_URL = 'http://localhost/wp-json/wp/v2';

/**
 * Fetch posts from WordPress API
 * @param page - Page number
 * @param perPage - Posts per page
 * @param categoryId - Optional category ID to filter by
 * @param tag - Optional tag to filter by
 * @returns Promise with posts and total count
 */
export async function getPosts(page = 1, perPage = 10, categoryId?: number, tag?: string) {
  try {
    let endpoint = `${WP_API_URL}/posts?_embed`;

    if (categoryId) {
      endpoint += `&categories=${categoryId}`;
    }

    if (tag) {
      endpoint += `&tags=${tag}`;
    }

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0');
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '0');

    const posts = await response.json() as WordPressPost[];

    return {
      posts,
      totalPosts,
      totalPages
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
      totalPosts: 0,
      totalPages: 0
    };
  }
}

/**
 * Get a single post by slug
 * @param slug - Post slug
 * @returns Post data or null if not found
 */
export async function getPostBySlug(slug: string): Promise<WordPressPost | null> {
  try {
    const response = await fetch(`${WP_API_URL}/posts?_embed&slug=${slug}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }

    const posts = await response.json() as WordPressPost[];

    return posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Get all categories
 * @returns Array of categories
 */
export async function getCategories(): Promise<WordPressCategory[]> {
  try {
    const response = await fetch(`${WP_API_URL}/categories?per_page=100`);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    return await response.json() as WordPressCategory[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get author by ID
 * @param id - Author ID
 * @returns Author data or null if not found
 */
export async function getAuthor(id: number): Promise<WordPressAuthor | null> {
  try {
    const response = await fetch(`${WP_API_URL}/users/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch author: ${response.status}`);
    }

    return await response.json() as WordPressAuthor;
  } catch (error) {
    console.error(`Error fetching author with ID ${id}:`, error);
    return null;
  }
}