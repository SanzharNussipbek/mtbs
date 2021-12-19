const Post = require("../../models/Post");
const { UserInputError } = require("apollo-server");
const { validateCreatePostInput } = require("../../utils/validators");

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find()?.sort({ createdAt: -1 });
        return posts;
      } catch (e) {
        throw new Error(e);
      }
    },
    async getPost(_, { id }) {
      try {
        const post = await Post.findById(id);
        if (!post) {
          throw new Error("Post not found");
        }
        return post;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
  Mutation: {
    async createPost(_, { data: { title, body, author, imgUrl } }, context) {
      const { valid, errors } = validateCreatePostInput(title, body, author);
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      const newPost = new Post({
        title,
        body,
        author,
        imgUrl,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },
    async deletePost(_, { id }, context) {
      try {
        const post = await Post.findById(id);
        if (!post) {
          throw new Error("Post not found");
        }
        await post.delete();
        return "Post deleted successfully";
      } catch (e) {
        throw new Error(e);
      }
    },
    async updatePost(_, { data }, context) {
      try {
        const { id, ...updatePostInput } = data;
        const post = await Post.findById(id);
        if (!post) {
          throw new Error("Post not found");
        }
        const updatedPost = await Post.findByIdAndUpdate(id, updatePostInput, {
          new: true,
        });
        return updatedPost;
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
