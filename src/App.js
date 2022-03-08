import React, { Suspense } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import MainNavigation from './components/layout/MainNavigation';
import Layout from './components/layout/Layout';
import AllQuote from './pages/AllQoutes';
import LoadingSpinner from './components/UI/LoadingSpinner';

const AddQuote = React.lazy(() => import('./pages/AddQoute'));
const QuoteDetails = React.lazy(() => import('./pages/QuoteDetails'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
  return (
      <Layout>
        <Router>
          <MainNavigation/> 
          <Suspense 
            fallback={ 
              <div    className="centered">                <LoadingSpinner /> 
              </div> 
            }
          >
            <Switch>
              <Route path="/" exact>
                <Redirect to="/quotes" />
              </Route>
              <Route path="/quotes" exact>
                <AllQuote />
              </Route>
              <Route path="/quotes/:id" >
                <QuoteDetails />
              </Route>
              <Route path="/addQuote">
                <AddQuote />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </Layout>
  );
}

export default App;
