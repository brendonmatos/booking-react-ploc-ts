import { PlacesList } from "../components/places-list";
import {useLoaderData} from 'react-router-dom'
import { ListPlaces } from "@/domain/usecases/ListPlaces";
import { placesService } from "@/store/state";

export function PlacesHome() {
  const {places} = useLoaderData() as ReturnType<typeof placesHomeLoader>
  return <div>
    <section className="py-8">
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">

      Choose your next experience
      </h2>
      <p className="leading-7">
      Find the perfect place to stay, from beach houses to cabins to condos and beyond.
      </p>
    </section>
    <PlacesList items={places} />
    </div>
}

export function placesHomeLoader() {
  const placesList = new ListPlaces(placesService)
  return {
    places: placesList.execute()
  }
}