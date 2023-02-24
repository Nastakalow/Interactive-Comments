import { useContext } from "react";
import { MyContext } from "../../context/InteractiveComments";

function Popup() {
  const [state, dispatch] = useContext(MyContext);

  const closeDeleteConfirm = () => {
    dispatch({
      type: "closeDeleteConfirm",
    });
  };

  const deleteComment = () => {
    dispatch({
      type: "deleteComment",
    });
  };

  return (
    <div className="fixed top-0 bottom-0 w-full bg-modal flex items-center justify-center">
      <div className="bg-white p-6 w-2/6 max-sm:w-11/12 rounded-lg">
        <div>
          <h3 className="text-xl text-dark-blue font-medium mb-4">
            Delete comment
          </h3>
          <p className="text-grayish-blue mb-4">
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-dark-blue hover:bg-dark-blue-hover uppercase text-white px-6 py-3 rounded-lg"
            onClick={closeDeleteConfirm}
          >
            no, cancel
          </button>
          <button
            className="bg-soft-red hover:bg-soft-red-hover uppercase text-white px-6 py-3 rounded-lg"
            onClick={deleteComment}
          >
            yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
