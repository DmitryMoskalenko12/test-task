import { useParams } from 'react-router-dom';
import { useRecipes } from '../store/store';
import { useEffect, Fragment } from 'react';
import style from './RecipePage.module.scss';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const RecipePage = () => {
  const fetchRecipe = useRecipes((state) => state.fetchOneRecipe);
  const recipe = useRecipes((state) => state.oneRecipe);
  const { id } = useParams();

  useEffect(() => {
    fetchRecipe(id);
  }, [id]);

  return (
    <div className={style.wrapper}>
      {recipe.map(
        ({
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
          volume,
        }) => {
          return (
            <Fragment key={id}>
              <Helmet>
                <meta charSet="utf-8" />
                <title>{name}</title>
              </Helmet>
              <Link className={style.link} to={'/'}>
                &lArr;
              </Link>
              <div className={style.img}>
                <img
                  src={image_url}
                  alt="You will see a bottle of beer"
                  width={300}
                  height={450}
                />
              </div>
              <div className={style.block1}>
                <h1 className={style.title}>{name}</h1>
                <div className={style.margin}>
                  <span className={style.subtitle}>Tagline:</span>{' '}
                  <span>{tagline}</span>
                </div>
                <div className={style.margin}>{description}</div>
                <div className={style.margin}>
                  <span className={style.subtitle}>First brewed:</span>{' '}
                  <span>{first_brewed}</span>
                </div>
                <div className={style.margin}>
                  <span className={style.subtitle}>Contributed by: </span>{' '}
                  <span>{contributed_by}</span>
                </div>
                <div className={style.margin}>
                  {' '}
                  <span className={style.subtitle}>Abv:</span>{' '}
                  <span>{abv}</span>
                </div>
                <div className={style.margin}>
                  <span className={style.subtitle}>Attenuation level:</span>{' '}
                  <span>{attenuation_level}</span>
                </div>
                <div className={style.margin}>
                  <span className={style.subtitle}>Boil volume:</span>{' '}
                  <span>
                    {boil_volume?.value} {boil_volume?.unit}
                  </span>
                </div>
              </div>

              <div className={style.block2}>
                <h2 className={style.title}>Ingredients</h2>
                <h3 className={style.title}>Hops:</h3>
                {ingredients.hops.map(({ name, amount, add, attribute }, i) => {
                  return (
                    <ul className={style.list} key={i}>
                      <li>
                        <span> {name}: </span>
                        <span>
                          {' '}
                          {amount?.value} {amount?.unit},{' '}
                        </span>
                        <span> {add} </span>
                        <span> {attribute}. </span>
                      </li>
                    </ul>
                  );
                })}
                <h3 className={style.title}>Malt:</h3>
                {ingredients.malt.map(({ name, amount }, i) => {
                  return (
                    <ul key={i} className={style.list}>
                      <li>
                        <span> {name}: </span>
                        <span>
                          {' '}
                          {amount?.value} {amount?.unit}.{' '}
                        </span>
                      </li>
                    </ul>
                  );
                })}
                <p>
                  <span className={style.subtitle}>Yeast:</span>{' '}
                  <span>{ingredients?.yeast}</span>
                </p>
              </div>

              <div className={style.block3}>
                <h2 className={style.title}>Method fermantation</h2>
                <div className={style.margin}>
                  {' '}
                  <span className={style.subtitle}>Temp:</span>{' '}
                  <span>
                    {method?.fermentation?.temp?.value}{' '}
                    {method?.fermentation?.temp?.unit},
                  </span>{' '}
                </div>
                <div className={style.margin}>
                  <span className={style.subtitle}>Mash temp:</span>
                  {method.mash_temp.map((item, i) => (
                    <span key={i}>
                      {' '}
                      {item?.temp?.value} {item?.temp?.unit}, duration:{' '}
                      {item?.duration}{' '}
                    </span>
                  ))}
                </div>
                <div className={style.margin}>
                  <span className={style.subtitle}>Twist</span> -{' '}
                  {method?.twist}.
                </div>

                <div className={style.margin}>
                  <span className={style.subtitle}>Ph:</span> {ph}
                </div>
                <div className={style.margin}>
                  <span className={style.subtitle}>Srm:</span> {srm}
                </div>
                <div className={style.margin}>
                  <span className={style.subtitle}>Ibu:</span> {ibu}
                </div>
                <div className={style.margin}>
                  <span className={style.subtitle}>Ebc:</span> {ebc}
                </div>

                <p className={style.tips}>
                  <span className={style.brewers}>
                    <span className={style.subtitle}>Brewers tips:</span>
                  </span>{' '}
                  {brewers_tips}
                </p>
                <h3 className={style.title}>Food pairing</h3>
                <div className={style.pairing}>
                  {food_pairing.map((item, i) => (
                    <ul className={style.list} key={i}>
                      <li>{item}</li>
                    </ul>
                  ))}
                </div>
                <div className={style.margin}>
                  <span className={style.subtitle}>Target fg:</span>{' '}
                  <span>{target_fg}</span>
                </div>
                <div className={style.margin}>
                  <span className={style.subtitle}>Target og:</span>{' '}
                  <span>{target_og}</span>
                </div>
                <div className={style.margin}>
                  <span className={style.subtitle}>Volume:</span>{' '}
                  <span>
                    {volume?.value} {volume?.unit}
                  </span>{' '}
                </div>
              </div>
            </Fragment>
          );
        },
      )}
    </div>
  );
};

export default RecipePage;
