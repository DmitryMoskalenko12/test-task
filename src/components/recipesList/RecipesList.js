import { useRecipes } from "../../store/store";
import { useEffect, useState } from "react";
import RecipesCard from "../recipesCard/RecipesCard";
import style from './RecipesList.module.scss';
import Button from "../../ui/button/Button";
import {shallow} from 'zustand/shallow';

const RecipesList = () => {
 
  const response = useRecipes(state => state.fetchRecipes);
  const selectedRecipes = useRecipes(state => state.selectedRecipes);
  const deleteAll = useRecipes(state => state.deleteAll);
  const leftOffset = useRecipes(state => state.leftOffset);
  const rightOffset = useRecipes(state => state.rightOffset);
  const setLeftOffset = useRecipes(state => state.setLeftOffset);
  const setRightOffset = useRecipes(state => state.setRightOffset);
  const setPage = useRecipes(state => state.setPage);
  const page = useRecipes(state => state.page);
  const resetLeftOffset = useRecipes(state => state.resetLeftOffset);
  const resetRightOffset = useRecipes(state => state.resetRightOffset);
  const proccess = useRecipes(state => state.proccess);
  const recipesData = useRecipes(state => state.recipes.slice(leftOffset, rightOffset));
  const recipesInitial = useRecipes(state => state.recipes);
  const deleteItems = useRecipes(state => state.deleteItemsAll);
  const resetItemsAll = useRecipes(state => state.resetItemsAll)

  useEffect(() => {
    response(page) 
  }, [page])

  useEffect(() => {
    if (rightOffset < (30 - deleteItems.length) && leftOffset < (25 - deleteItems.length) ) {
      window.addEventListener('scroll', scrollEnd)
      window.scrollTo(0, 0)
    }  
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight && rightOffset >= (30 - deleteItems.length) && leftOffset >= (25 - deleteItems.length)) {
      window.scrollTo(0, 0)
      setPage()
      resetLeftOffset(0)
      resetRightOffset(0) 
      resetItemsAll() 
      
    }
    return () => window.removeEventListener('scroll', scrollEnd)
   },[rightOffset, leftOffset])
console.log(deleteItems)
 console.log(recipesInitial)
 const scrollEnd = () => {
  
    if ((window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) && rightOffset < (30 - deleteItems.length) && leftOffset < (25 - deleteItems.length) ) {
           
      setLeftOffset()
      setRightOffset()
     } 
    
    
 }

console.log(recipesData)
  const onDelete = () => {
   
   if (recipesInitial.filter(item => !selectedRecipes.includes(item)).length === 0) {
    setPage()
     
   }
    
   deleteAll();
  }

  return (
    <>
    {selectedRecipes.length > 0 ? <Button delete={onDelete}>Delete</Button>: null}
    <ul className={style.wrapper}>
      {
        proccess === 'fulfiled' ? recipesData/* .slice(leftOffset, rightOffset) */.map(({name, description, image_url, id}, i) => {
         
          return <RecipesCard key={id} id={id} name={name} description={description} image={image_url}/>
        }) : proccess === 'loading' ? <div className={style.proccess}>...Loading</div>: <div>Error</div>
      }
    </ul>
    </>
  )
}

export default RecipesList;