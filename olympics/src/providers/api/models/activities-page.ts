import { Activity } from "./activity";

export interface ActivitiesPage {
    content: Activity[],
    totalPages: number,
    totalElements: number,
    last: boolean,
    size: number,
    number: number,
    sort: string | null,
    numberOfElements: number,
    first: boolean
}
