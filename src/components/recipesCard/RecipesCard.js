import style from './RecipesCard.module.scss';
import { Link } from 'react-router-dom';

const RecipesCard = (props) => {
  const {name, image, description, id} = props;

  return (
    <li className={style.wrapper}>
      <Link className={style.link} to={`/detail/${id}`}>
        <div className={style.img}>
          <img src={image} alt="You will see beer recipe" />
        </div>

        <p className={style.name}>{name}</p>
        <p className={style.descr}>{description}</p>
      </Link>
    </li>
  )
}

export default RecipesCard;