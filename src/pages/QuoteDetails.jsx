import { useEffect} from 'react';
import { Route, useParams, Link, useRouteMatch } from 'react-router-dom';
import classes from './QuoteDetails.module.css';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from '../components/UI/LoadingSpinner';
//import { DUMMY_QUOTES } from '../utils/dummyData';

import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../libs/api';


const QuoteDetails = () => {
  const {id} = useParams();
  const match = useRouteMatch();
  const {sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(id);
  }, [sendRequest, id]);

  if(status === 'pending'){
      return <div className="centered">
        <LoadingSpinner />
      </div>
  }

  if(error){
    return <div className="centered">
      {error}
  </div>
  }


  if(!loadedQuote.text){
    return <p>No Quote Found.</p>
  }

  return (
    <main className={classes.main}>
      <HighlightedQuote 
        text={loadedQuote.text}
        author={loadedQuote.author}
      />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`} >
        <Comments />
      </Route>
    </main>
  )
};

export default QuoteDetails;