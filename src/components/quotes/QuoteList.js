import { Fragment } from "react";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
import { useHistory, useLocation } from "react-router-dom";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isAscending);

  const changeSortingHandler = () => {
    if (isAscending) {
    }
    // instead of using this hard to read code in the useHistory
    // history.push(`${location.pathname}?sort=` + (isAscending ? "desc" : "asc"));

    // you can pass an object to useHistory for code readability
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isAscending ? "desc" : "asc")}`
    })
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
