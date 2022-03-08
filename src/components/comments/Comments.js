import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from '../comments/CommentsList';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../libs/api'
 
const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {sendRequest, status, data: loadedComment} = useHttp(getAllComments);
  let comments = null; 
  const {id} = params;

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);
  
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const AddCommentHandler = useCallback( () => {
    sendRequest(id);
    setIsAddingComment(false);
  }, [sendRequest, id, setIsAddingComment]);

  if(status === "pending"){
    comments = <div className="centered" >
      <LoadingSpinner />
    </div>
  }

  if(status === "completed" && (loadedComment || loadedComment.length > 0)){
    comments = <CommentsList comments={loadedComment}/>
  }

  if(status === "completed" && (!loadedComment || loadedComment.length === 0)){
    comments = <p className="centered" >No Comments were added yet!</p>
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm  quoteId={params.id} onAddComment={AddCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
