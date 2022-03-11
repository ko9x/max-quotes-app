import classes from './QuoteItem.module.css';
import { Link, useLocation } from 'react-router-dom';

const QuoteItem = (props) => {
  const location = useLocation();
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link to={`${location.pathname}/${props.id}`} className='btn'>
      View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
