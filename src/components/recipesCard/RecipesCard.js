import style from './RecipesCard.module.scss';
import { Link } from 'react-router-dom';
import { useRecipes } from '../../store/store';
import { useState } from 'react';

const RecipesCard = (props) => {
  const {name, image, description, id} = props;

  const res = useRecipes(state => state.selectedRecipes);
  const toggleSelectedRecipe = useRecipes(state => state.toggleSelectedRecipe);
  const [active, setActive] = useState();

  const onHandleRightButton = (e, id) => {
   
      e.preventDefault();
     
       toggleSelectedRecipe(id)
   
   const recipe = res.find(item => item.id === id);
   setActive(!recipe ? style.active : '');

  }

  return (
    <li className={`${style.wrapper} ${active}`} onContextMenu={(e) => onHandleRightButton(e, id)}>
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