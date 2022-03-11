import { Route, Link, useRouteMatch } from "react-router-dom";
import classes from "./QuoteDetail.module.css";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { useEffect } from "react";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const match = useRouteMatch();
  const quoteId = match.params.quoteId;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && !loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <section>
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      <Route exact path={`${match.path}/comments`}>
        <Link to={match.url} className={classes.load}>
          Hide Comments
        </Link>
        <Comments />
      </Route>
      <Route exact path={match.path}>
        <Link to={`${match.url}/comments`} className={classes.load}>
          Load Comments
        </Link>
      </Route>
    </section>
  );
};

export default QuoteDetail;
