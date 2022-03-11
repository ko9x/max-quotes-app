import { useState, useEffect, useCallback } from 'react';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import { useRouteMatch } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest, status, data: loadedComments, error} = useHttp(getAllComments, true);
  const match = useRouteMatch();

  useEffect(() => {
    sendRequest(match.params.quoteId);
  }, [sendRequest, match.params.quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment((prevState) => !prevState);
  };

  const addNewCommentHandler = useCallback(() => {
    sendRequest(match.params.quoteId)
    startAddCommentHandler();
  }, [sendRequest, match.params.quoteId]);

  let comments;

  if (status === 'pending') {
   comments = <div className='centered'><LoadingSpinner /></div>
  }

  if (error) {
   return <p className='centered'>{error}</p>
  }

  if (status === 'completed' && (loadedComments && loadedComments.length > 0)) {
   comments = <CommentsList comments={loadedComments}/>
  }

  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
   comments = <p className='centered'>No comments have been added for this quote</p>
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddNewComment={addNewCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
