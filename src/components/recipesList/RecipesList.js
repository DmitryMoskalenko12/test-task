import { useRecipes } from "../../store/store";
import { useEffect } from "react";
import RecipesCard from "../recipesCard/RecipesCard";
import style from './RecipesList.module.scss';
import { Link } from "react-router-dom";

const RecipesList = () => {
  const recipesData = useRecipes(state => state.recipes);
  const response = useRecipes(state => state.fetchRecipes);

  useEffect(() => {
    response() 
  }, [])

  return (
    <ul className={style.wrapper}>
      {
        recipesData.map(({name, description, image_url, id}) => {
          return <RecipesCard key={id} id={id} name={name} description={description} image={image_url}/>
        })
      }
    </ul>
  )
}

export default RecipesList;