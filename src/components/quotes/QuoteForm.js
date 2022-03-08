import {Fragment, useRef, useState } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const validateEmpty = value => value.trim().length > 0;

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [formFocus, setFormFocus] = useState(false);
  const [requiredField, setRequiredField] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();
    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;
    // Vlaidate fields, could not be empty.
    const validAuthor = validateEmpty(enteredAuthor);
    const validText = validateEmpty(enteredText);
    
    const validForm = validAuthor && validText;

    if(!validForm){
      setRequiredField(true);
      return;
    }
    
    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const fieldFocusHandler = (event) => {
    setRequiredField(false);
  }

  const formFocusFineshedHandler = () => {
    setFormFocus(false);
  }

  const formFocusHandler = () => {
    setFormFocus(true);

  }

  return (
    <Fragment>
    <Prompt when={formFocus} message={ (location) => 
      'Are you sure you want to leave? Some Data can be lost.'
    } />
    <Card>
      <form onFocus={formFocusHandler} className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}
        {requiredField && <p className={classes.filedRequired}>All fields are required.</p>}
        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' ref={authorInputRef} onFocus={fieldFocusHandler} className={requiredField ? classes.error : ''} />
        </div>
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef} onFocus={fieldFocusHandler} className={requiredField ? classes.error : ''} ></textarea>
        </div>
        <div className={classes.actions}>
          <button onClick={formFocusFineshedHandler} className='btn'>Add Quote</button>
        </div>
      </form>
    </Card>
    </Fragment>
  );
};

export default QuoteForm;
