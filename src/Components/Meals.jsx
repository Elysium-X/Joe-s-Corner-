import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
import { getApiUrl } from "../util/api.js";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(getApiUrl("/meals"), requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching Meals..</p>;
  }

  if (error) {
    return (
      <div className="meals-error-state">
        <Error title="Failed to fetch Meals" message={error} />
      </div>
    );
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
