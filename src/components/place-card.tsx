import type { Place } from "@/domain/entity/Calendar";
import { Card } from "@/components/ui/card";
import { PlaceCardContent } from "./place-card-content";

interface PlaceProps {
	place: Place;
}

export function PlaceCard({ place }: PlaceProps) {
	return (
		<Card className="w-full">
			<PlaceCardContent place={place} />
		</Card>
	);
}
