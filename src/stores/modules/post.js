import axios from '@/api.js'

const PostModule = {
  namespaced: true,
  state() {
    return {
      posts: []
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    pushPosts(state, post) {
      state.posts.unshift(post)
    },
    pushComment(state, { postId, comment }) {
      const postIndex = state.posts.findIndex((post) => post.id == postId)
      if (postIndex != -1) {
        state.posts[postIndex].comments.unshift(comment)
      }
    },
    removeComment(state, { postId, commentId }) {
      console.log(postId)
      const postIndex = state.posts.findIndex((post) => post.data.post_id == postId)
      if (postIndex !== -1) {
        const commentIndex = state.posts[postIndex].data.attributes.comments.data.findIndex(
          (comment) => comment.data.comment_id == commentId
        )
        if (commentIndex !== -1) {
          state.posts[postIndex].data.attributes.comments.data.splice(commentIndex, 1)
        }
      }
    }
  },
  actions: {
    async fetchPosts(context) {
      const res = await axios.get('/api/posts')
      context.commit('setPosts', res?.data.data)
    },
    async addPost(context, payload) {
      console.log(payload)
      const res = await axios.post('/api/posts', payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      context.commit('pushPosts', res?.data.data)
      return res
    },
    async editPost(context, payload) {
      const { postId, ...body } = payload
      console.log(body)
      const res = await axios.put(`/api/posts/${postId}`, body)
      await context.dispatch('fetchPosts')
      return res
    },
    async removePost(context, payload) {
      const { postId } = payload
      const res = await axios.delete(`/api/posts/${postId}`)
      await context.dispatch('fetchPosts')
      return res
    },
    async addComment(context, payload) {
      const { postId, commentData } = payload
      const res = await axios.post(`/api/posts/${postId}/comment`, { body: commentData })
      context.commit('pushComment', { postId, comment: res.data })
      await context.dispatch('fetchPosts')
      return res
    },
    async removeComment(context, payload) {
      const { postId, commentId } = payload
      const res = await axios.delete(`/api/posts/${postId}/comment/${commentId}`)
      context.commit('removeComment', { postId, commentId })
      return res
    }
  },
  getters: {
    posts: (state) => {
      return state.posts
    },
    postById: (state) => (id) => {
      return state.posts.find((post) => post.data.post_id == id)
    }
  }
}

export default PostModule
