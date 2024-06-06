import type { Place } from "@/domain/entity/Calendar";
import { CardContent } from "@/components/ui/card";
import formatCurrencyToHuman from "@/lib/formatCurrencyToHuman";
import { cn } from "@/lib/utils";

interface PlaceCardContentProps {
	place: Place;
	orientation?: "horizontal" | "vertical";
	children?: React.ReactNode;
}

export function PlaceCardContent({
	place,
	orientation = "vertical",
	children,
}: PlaceCardContentProps) {
	return (
		<div
			className={cn("flex flex-col w-full ", {
				"sm:flex-row": orientation === "horizontal",
				"sm:flex-col w-full": orientation === "vertical",
			})}
		>
			<div
				className={cn("relative bg-center bg-cover", {
					"rounded-t-lg w-full h-[200px]": orientation === "vertical",
					"rounded-lg aspect-square h-[200px]": orientation === "horizontal",
				})}
				style={{ backgroundImage: `url(${place.image})` }}
			/>
			<CardContent className="p-4 flex flex-col items-start justify-center ">
				<CardContentFlex place={place} orientation={orientation} />
				{children}
			</CardContent>
		</div>
	);
}

export const CardContentFlex = ({
	place,
	orientation = "vertical",
}: { orientation?: "horizontal" | "vertical"; place: Place }) => {
	return (
		<>
			<h3
				className={cn("", {
					"mt-10 scroll-m-20 pb-2 text-5xl font-semibold tracking-tight transition-colors first:mt-0":
						orientation === "horizontal",
				})}
			>
				{place.name}
			</h3>
			<span
				className={cn("font-semibold", {
					"text-2xl": orientation === "horizontal",
				})}
			>
				{formatCurrencyToHuman(place.price)}
			</span>
			<span
				className={cn("text-muted-foreground", {
					"text-lg": orientation === "horizontal",
				})}
			>
				{" "}
				per night without taxes
			</span>
		</>
	);
};
