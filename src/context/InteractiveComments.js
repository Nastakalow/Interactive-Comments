import { createContext, useReducer } from "react";
import Data from "../data.json";

export const MyContext = createContext();

const { comments } = Data;

const initialState = {
  comments,
  lastId: 4,
  isReply: {
    1: false,
    2: false,
    3: false,
  },
  isDeleteConfirm: {
    id: null,
    status: false,
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addComment":
      var comments = [...state.comments];
      var lastId = state.lastId;
      var newComment = {
        id: ++lastId,
        content: action.payload,
        createdAt: new Date().toISOString().slice(0, 10),
        score: 0,
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
        editabled: false,
      };

      comments.push(newComment);

      return {
        ...state,
        comments,
        lastId,
      };

    case "setReplyInput":
      switch (action.payload) {
        case 1:
          var isReply = { ...state.isReply };
          isReply[1] = !isReply[1];
          return {
            ...state,
            isReply,
          };

        case 2:
          var isReply = { ...state.isReply };
          isReply[2] = !isReply[2];
          return {
            ...state,
            isReply,
          };

        case 3:
          var isReply = { ...state.isReply };
          isReply[3] = !isReply[3];
          return {
            ...state,
            isReply,
          };

        default:
          return state;
      }

    case "replyComment":
      var comments = [...state.comments];
      var comment;
      var lastId = state.lastId;
      var isReply = { ...state.isReply };
      var id = action.payload.id;
      var replyTo =
        id === 1
          ? "amyrobson"
          : id === 2
          ? "maxblagun"
          : id === 3
          ? "ramsesmiron"
          : "";
      var newReplyComment = {
        id: ++lastId,
        content: action.payload.value,
        createdAt: new Date().toISOString().slice(0, 10),
        score: 0,
        replyingTo: replyTo,
        user: {
          image: {
            png: "./images/avatars/image-juliusomo.png",
            webp: "./images/avatars/image-juliusomo.webp",
          },
          username: "juliusomo",
        },
        editabled: false,
      };

      comment = comments.filter((item) => item.id === action.payload.id)[0];

      isReply[action.payload.id] = !isReply[action.payload.id];

      if (!comment) {
        comments?.forEach((com) => {
          if (com.replies) {
            comment = com.replies.filter(
              (item) => item.id === action.payload.id
            )[0];
          }
        });
      }

      comment.replies.push(newReplyComment);

      return {
        ...state,
        comments,
        lastId,
        isReply,
      };

    case "increment":
      var comments = [...state.comments];
      let incComment;

      if (comments?.some((item) => item.id === action.payload)) {
        incComment = comments.filter((item) => item.id === action.payload)[0];
      } else {
        comments?.forEach((comment) => {
          if (incComment) {
            return incComment;
          }
          if (comment.replies?.some((reply) => reply.id === action.payload)) {
            incComment = comment.replies.filter(
              (reply) => reply.id === action.payload
            )[0];
          } else {
            comment.replies?.forEach((replyItem) => {
              if (replyItem.replies) {
                incComment = replyItem.replies.filter(
                  (item) => item.id === action.payload
                )[0];
              }
            });
          }
        });
      }

      incComment.score++;

      return {
        ...state,
        comments,
      };

    case "decrement":
      var comments = [...state.comments];
      let decComment;

      if (comments?.some((item) => item.id === action.payload)) {
        decComment = comments.filter((item) => item.id === action.payload)[0];
      } else {
        comments?.forEach((comment) => {
          if (decComment) {
            return decComment;
          }
          if (comment.replies?.some((reply) => reply.id === action.payload)) {
            decComment = comment.replies.filter(
              (reply) => reply.id === action.payload
            )[0];
          } else {
            comment.replies?.forEach((replyItem) => {
              if (replyItem.replies) {
                decComment = replyItem.replies.filter(
                  (item) => item.id === action.payload
                )[0];
              }
            });
          }
        });
      }

      decComment.score--;

      return {
        ...state,
        comments,
      };
    case "showDeleteConfirm":
      var isDeleteConfirm = state.isDeleteConfirm;
      isDeleteConfirm = {
        id: action.payload,
        status: true,
      };
      return {
        ...state,
        isDeleteConfirm,
      };
    case "closeDeleteConfirm":
      var isDeleteConfirm = state.isDeleteConfirm;
      isDeleteConfirm.status = false;
      return {
        ...state,
        isDeleteConfirm,
      };
    case "deleteComment":
      var comments = [...state.comments];
      var isDeleteConfirm = { ...state.isDeleteConfirm };
      var id = isDeleteConfirm.id;

      if (comments?.some((item) => item.id === id)) {
        comments = comments.filter((item) => item.id !== id);
      } else {
        comments?.forEach((comment) => {
          if (comment.replies?.some((reply) => reply.id === id)) {
            comment.replies = comment.replies.filter(
              (reply) => reply.id !== id
            );
          } else {
            comment.replies?.forEach((replyItem) => {
              if (replyItem.replies) {
                replyItem.replies = replyItem.replies.filter(
                  (item) => item.id !== id
                );
              }
            });
          }
        });
      }

      isDeleteConfirm.status = false;

      return {
        ...state,
        comments,
        isDeleteConfirm,
      };

    case "editComment":
      var comments = [...state.comments];
      let editComment;

      if (comments?.some((item) => item.id === action.payload)) {
        editComment = comments.filter((item) => item.id === action.payload)[0];
      } else {
        comments?.forEach((comment) => {
          if (editComment) {
            return editComment;
          }
          if (comment.replies?.some((reply) => reply.id === action.payload)) {
            editComment = comment.replies.filter(
              (reply) => reply.id === action.payload
            )[0];
          } else {
            comment.replies?.forEach((replyItem) => {
              if (replyItem.replies) {
                editComment = replyItem.replies.filter(
                  (item) => item.id === action.payload
                )[0];
              }
            });
          }
        });
      }

      editComment.editabled = !editComment.editabled;

      return {
        ...state,
        comments,
      };

    case "updateComment":
      var comments = [...state.comments];
      let updateContent;

      if (comments?.some((item) => item.id === action.payload.id)) {
        updateContent = comments.filter(
          (item) => item.id === action.payload.id
        )[0];
      } else {
        comments?.forEach((comment) => {
          if (updateContent) {
            return updateContent;
          }
          if (
            comment.replies?.some((reply) => reply.id === action.payload.id)
          ) {
            updateContent = comment.replies.filter(
              (reply) => reply.id === action.payload.id
            )[0];
          } else {
            comment.replies?.forEach((replyItem) => {
              if (replyItem.replies) {
                updateContent = replyItem.replies.filter(
                  (item) => item.id === action.payload.id
                )[0];
              }
            });
          }
        });
      }

      updateContent.content = action.payload.value;
      updateContent.editabled = !updateContent.editabled;

      return {
        ...state,
        comments,
      };

    default:
      return state;
  }
};

function InteractiveComments({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MyContext.Provider value={[state, dispatch]}>
      {children}
    </MyContext.Provider>
  );
}

export default InteractiveComments;
