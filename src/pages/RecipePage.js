import { useParams } from "react-router-dom";
import { useRecipes } from "../store/store";
import { useEffect, Fragment } from "react";
import style from './RecipePage.module.scss';
import { Link } from "react-router-dom";
const RecipePage = () => {
  const fetchRecipe = useRecipes(state => state.fetchOneRecipe);
  const recipe = useRecipes(state => state.oneRecipe);
  const {id} = useParams();

  useEffect(() => {
    fetchRecipe(id)
  }, [id])

  
  return (
    <div className={style.wrapper}>
    {
      recipe.map(({ 
        name,
        id,
        description,
        contributed_by,
        brewers_tips, 
        first_brewed,
        abv,
        attenuation_level,
        boil_volume,
        food_pairing, 
        image_url, 
        ingredients, 
        method, 
        ph,
        ibu, 
        srm,
        ebc, 
        tagline,
        target_fg,
        target_og,
        volume}) => {
      return <Fragment key={id}>
        <Link to = {'/'}>Back</Link>
        <div className={style.img}>
        <img src={image_url} alt='You will see bootle of beer' />
        </div>
        <h2 className={style.name}>{name}</h2>
        <p className={style.tagline}>Tagline: <span>{tagline}</span></p>
        <p className={style.descr}>{description}</p>
        <p className={style.brewed}>First brewed: <span>{first_brewed}</span></p>
        <p className={style.contrybuted}>Contributed by: <span>{contributed_by}</span></p>
        <p className={style.abv}>Abv: <span>{abv}</span></p>
        <p className={style.attenuation}>Attenuation level: <span>{attenuation_level}</span></p>

        <p>Boil volume: <span>{boil_volume?.value} {boil_volume?.unit}</span></p>
        <div className={style.ingr}>
        <div className={style.ingridients}>Ingredients</div>
        Hops:
        {
          ingredients.hops.map(({name, amount, add, attribute}, i) => {
            return <ul key={i}>
            <li> 
             <span> {name}: </span>
             <span> {amount?.value} {amount?.unit}, </span>
             <span> {add} </span>
             <span> {attribute}. </span>
             </li>
            </ul>
          })
        }
         Malt:
        {
          ingredients.malt.map(({name, amount}, i) => {
            return <ul key={i}>
            <li> 
             <span> {name}: </span>
             <span> {amount?.value} {amount?.unit}. </span>
             </li>
            </ul>
          })
        }
        <p>Yeast: <span>{ingredients?.yeast}</span></p>

        </div>

        <div className={style.method}>Method fermantation</div>
        <div>Temp: <span>{method?.fermentation?.temp?.value} {method?.fermentation?.temp?.unit},</span> </div>
        <span>Mash temp:</span>
        {
          method.mash_temp.map((item, i) => <span key={i}> {item?.temp?.value} {item?.temp?.unit}, duration: {item?.duration} </span>)
        }
        <div>Twist - {method?.twist}.</div>

        <div>Ph: {ph}</div>
        <div>Srm: {srm}</div>
        <div>Ibu: {ibu}</div>
        <div>Ebc: {ebc}</div>
    
        <p className={style.tips}><span className={style.brewers}>Brewers tips:</span> {brewers_tips}</p>
        <div className={style.pairing}>
         <span>Food pairing: </span>
         {
          food_pairing.map((item, i) => <ul key={i}><li>{item}</li></ul>)
         }
        </div>
        <p>Target fg: <span>{target_fg}</span></p>
        <p>Target og: <span>{target_og}</span></p>
        <div>Volume: <span>{volume?.value} {volume?.unit}</span> </div>

       </Fragment>
      })
    }
    </div>
  )
}

export default RecipePage;