import { useRef, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import { useRouteMatch } from "react-router-dom";
import classes from "./NewCommentForm.module.css";
import { useHistory, useLocation } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const match = useRouteMatch();
  const { sendRequest, status, error } = useHttp(addComment, false);
  const history = useHistory();
  const location = useLocation();


  const { onAddNewComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddNewComment();
    }
  }, [status, location.pathname, history, error, onAddNewComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest({
      quoteId: match.params.quoteId,
      commentData: event.target.comment.value,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
