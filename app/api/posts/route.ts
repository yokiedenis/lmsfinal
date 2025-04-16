import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to posts.json in the project root
const postsFilePath = path.join(process.cwd(), 'posts.json');

// Ensure posts.json exists
if (!fs.existsSync(postsFilePath)) {
  fs.writeFileSync(postsFilePath, JSON.stringify([]));
}

// Helper functions to read/write posts
const readPosts = () => JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'));
const writePosts = (posts: any) => fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));

// GET: Fetch all posts
export async function GET() {
  try {
    const posts = readPosts();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// POST: Create a new post
export async function POST(request: Request) {
  try {
    const newPost = await request.json();
    const posts = readPosts();
    posts.push(newPost);
    writePosts(posts);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

// PUT: Update a post (e.g., for replies or pinning)
export async function PUT(request: Request) {
  try {
    const updatedPost = await request.json();
    let posts = readPosts();
    posts = posts.map((post: any) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    writePosts(posts);
    return NextResponse.json({ message: 'Post updated' }, { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

// DELETE: Delete a post by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    let posts = readPosts();
    posts = posts.filter((post: any) => post.id !== id);
    writePosts(posts);
    return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}