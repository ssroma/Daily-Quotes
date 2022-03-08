import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AddQuote.module.css';
import QuoteForm from '../components/quotes/QuoteForm';

import useHttp from '../hooks/use-http';
import { addQuote } from '../libs/api'
 
const AddQuote = () => {
  const { sendRequest, status} = useHttp(addQuote, false);
  const history = useHistory();

  useEffect(() => {
    if(status === 'completed'){
      history.push('/quotes');
    }
  }, [status, history]);

  const addQuoteHandler = quote => {
    sendRequest(quote);
  }

  return (
    <main className={classes.main}>
      <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
    </main>
  )
};

export default AddQuote;