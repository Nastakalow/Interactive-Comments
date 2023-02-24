import Comment from "../comment";
import Data from "../../data.json";
import { useContext } from "react";
import { MyContext } from "../../context/InteractiveComments";
import AddComment from "../addComment";
import Popup from "../popup";

function InteractiveComments() {
  const [state, dispatch] = useContext(MyContext);
  const { currentUser } = Data;

  return (
    <>
      <div className="w-3/5 max-sm:w-10/12 mx-auto mt-12">
        {state.comments.map((comment) => (
          <Comment key={`comment-${comment.id}`} {...comment} />
        ))}
        <AddComment {...currentUser} />
      </div>
      {state.isDeleteConfirm.status && <Popup />}
    </>
  );
}

export default InteractiveComments;
