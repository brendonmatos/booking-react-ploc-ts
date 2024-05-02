import { format } from "date-fns";

export function formatDateToHuman(date: Date) {
	return format(date, "dd/MM/yyyy");
}
