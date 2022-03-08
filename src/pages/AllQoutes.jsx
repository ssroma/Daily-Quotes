import { useEffect } from 'react';
import classes from './AllQuotes.module.css';
import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../libs/api';
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import LoadingSpinner from '../components/UI/LoadingSpinner';

//import { DUMMY_QUOTES } from '../utils/dummyData';

const AllQuote = () => {
  const {sendRequest, status, data: loadedQuotes, error, } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if(status === 'pending'){
    return <div className="centered">
      <LoadingSpinner />
    </div>
  }

  if(status === 'error'){
    return <div className="centered focused">
      {error}
    </div>
  }

  if(status === 'completed' && ( !loadedQuotes || loadedQuotes.length === 0 )){
    return <NoQuotesFound />
  }

  return (
    <main className={classes.main}>
      <QuoteList  quotes={loadedQuotes} />
    </main>
  )
};

export default AllQuote;