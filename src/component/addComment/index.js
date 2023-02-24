import { useContext, useRef } from "react";
import { MyContext } from "../../context/InteractiveComments";

function AddComment({ id, image, isReplyBtn }) {
  const inpRef = useRef();
  const [state, dispatch] = useContext(MyContext);

  const addComment = () => {
    dispatch({
      type: "addComment",
      payload: inpRef.current.value,
    });
    inpRef.current.value = "";
  };

  const replyComment = () => {
    dispatch({
      type: "replyComment",
      payload: {
        value: inpRef.current.value,
        id,
      },
    });
    inpRef.current.value = "";
  };

  return (
    <div className="flex items-center justify-between flex-wrap bg-white p-4 rounded-lg mb-4">
      <img className="w-10 order-2" src={image.png} alt="" />
      <input
        className="w-full h-24 order-1 border border-light-gray rounded-lg px-3 pb-12 mb-6 outline-none"
        ref={inpRef}
        type="text"
        placeholder="Add a comment..."
      />
      {isReplyBtn ? (
        <button
          className="order-3 bg-moderate-blue hover:bg-moderate-blue-hover px-8 py-3 text-white uppercase rounded-lg"
          onClick={replyComment}
        >
          reply
        </button>
      ) : (
        <button
          className="order-3 bg-moderate-blue hover:bg-moderate-blue-hover px-8 py-3 text-white uppercase rounded-lg"
          onClick={addComment}
        >
          send
        </button>
      )}
    </div>
  );
}

export default AddComment;
