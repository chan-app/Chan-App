const getBoardsURL = () => `https://a.4cdn.org/boards.json`;
const getThreadsURL = (board, page) =>
  `https://a.4cdn.org/${board}/${page}.json`;
const getPostsURL = (board, thread) =>
  `https://a.4cdn.org/${board}/thread/${thread}.json`;
const getThreadURL = (board, thread) =>
  `http://Boards.4chan.org/${board}/thread/${thread}`;

export { getBoardsURL, getThreadsURL, getPostsURL, getThreadURL };
