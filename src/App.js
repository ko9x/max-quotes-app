import { Route, Switch, Redirect } from "react-router-dom";
import Quotes from "./pages/Quotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {

  return (
    <div>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Redirect to="/quotes" />
          </Route>
          <Route exact path="/quotes">
            <Quotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
