import { useContext, useRef } from "react";
import { MyContext } from "../../context/InteractiveComments";
import Data from "../../data.json";
import AddComment from "../addComment";

function Comment({
  id,
  score,
  replyingTo,
  createdAt,
  content,
  user,
  replies,
  editabled,
}) {
  const [state, dispatch] = useContext(MyContext);

  const CURRENT_USER = "juliusomo";
  const { currentUser } = Data;
  let button = null;
  const inpRef = useRef();

  const setReplyInput = () => {
    dispatch({
      type: "setReplyInput",
      payload: id,
    });
  };

  const increment = () => {
    dispatch({
      type: "increment",
      payload: id,
    });
  };

  const decrement = () => {
    dispatch({
      type: "decrement",
      payload: id,
    });
  };

  const showDeleteConfirm = () => {
    dispatch({
      type: "showDeleteConfirm",
      payload: id,
    });
  };

  const editComment = () => {
    dispatch({
      type: "editComment",
      payload: id,
    });
  };

  const updateComment = () => {
    dispatch({
      type: "updateComment",
      payload: {
        id,
        value: inpRef.current.value,
      },
    });
    inpRef.current.value = "";
  };

  if (user.username === CURRENT_USER) {
    button = (
      <div className="flex items-center mb-auto max-sm:mb-0 max-sm:order-3 max-sm:ml-auto mt-2 max-sm:mt-0">
        <img className="mr-1" src="./images/icon-delete.svg" alt="" />
        <button
          className="text-soft-red font-medium mr-4"
          onClick={showDeleteConfirm}
        >
          Delete
        </button>
        <img className="mr-1" src="./images/icon-edit.svg" alt="" />
        <button
          className="text-moderate-blue font-medium"
          onClick={editComment}
        >
          Edit
        </button>
      </div>
    );
  } else {
    button = (
      <div className="mb-auto max-sm:mb-0 max-sm:order-3 max-sm:ml-auto mt-2 max-sm:mt-0">
        <div className="flex items-center gap-2">
          <img src="./images/icon-reply.svg" alt="" />
          <button
            className="text-moderate-blue font-medium"
            onClick={setReplyInput}
          >
            Reply
          </button>
        </div>
      </div>
    );
  }

  function setEditabled() {
    if (editabled) {
      return (
        <div className="flex flex-wrap">
          <input
            className="w-full h-24 order-1 border border-light-gray rounded-lg px-3 pb-12 mb-6 outline-none"
            ref={inpRef}
            type="text"
            defaultValue={content}
          />
          <button
            className="order-2 bg-moderate-blue hover:bg-moderate-blue-hover px-8 py-3 text-white uppercase rounded-lg ml-auto"
            onClick={updateComment}
          >
            update
          </button>
        </div>
      );
    } else {
      return (
        <p className="text-grayish-blue text-sm">
          {replyingTo && `@${replyingTo} `} {content}
        </p>
      );
    }
  }

  let isEditabled = setEditabled();

  return (
    <div>
      <div className="flex justify-between max-sm:flex-wrap items-center gap-6 bg-white mb-6 p-4 pr-8 max-sm:pr-4 rounded-lg">
        <div className="flex flex-col max-sm:flex-row items-center justify-center gap-6 px-4 py-4 rounded-lg bg-very-light-gray max-sm:order-2">
          <button onClick={increment}>
            <img src="./images/icon-plus.svg" alt="" />
          </button>
          <p className="text-moderate-blue font-medium">{score}</p>
          <button onClick={decrement}>
            <img src="./images/icon-minus.svg" alt="" />
          </button>
        </div>
        <div className="max-sm:order-1 mb-4 mr-auto">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <img className="w-10" src={user.image.png} alt="#" />
            <h3 className="font-medium">{user.username}</h3>
            {user.username === CURRENT_USER && (
              <p className="bg-moderate-blue px-1 text-white rounded-sm">you</p>
            )}
            <p className="text-grayish-blue">{createdAt}</p>
          </div>
          <div>{isEditabled}</div>
        </div>
        {button}
      </div>
      <div className="w-[80%] max-sm:w-full ml-auto border-l-2 pl-4 border-light-gray">
        {replies?.length
          ? replies?.map((item) => <Comment key={item?.id} {...item} />)
          : ""}
      </div>
      {state.isReply[id] && (
        <AddComment id={id} isReplyBtn={true} image={currentUser.image} />
      )}
    </div>
  );
}

export default Comment;
