import { PlaceCard } from "./place-card";
import type { Place } from "@/domain/entity/Calendar";
import { Link } from "react-router-dom";

export type PlacesListProps = {
	items: Place[];
};
export function PlacesList({ items }: PlacesListProps) {
	return (
		<div className="flex flex-wrap">
			{items.map((item) => (
				<Link
					to={`/${item.id}/bookings`}
					key={item.name}
					className="pb-2 pr-2 w-full md:w-1/2 lg:w-1/3"
				>
					<PlaceCard key={item.name} place={item} />
				</Link>
			))}
		</div>
	);
}
