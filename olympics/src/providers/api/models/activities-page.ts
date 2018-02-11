import { Activity } from "./activity";

export interface ActivitiesPage {
  content: Array<Activity>,
  totalPages: number,
  totalElements: number,
  last: boolean,
  size: number,
  number: number,
  sort: string | null,
  numberOfElements: number,
  first: boolean
}

export class ActivitiesPage implements ActivitiesPage {
  constructor() {
    this.content = []
    this.totalPages = 0
    this.totalElements = 0
    this.last = false
    this.size = 0
    this.number = 0
    this.sort = null
    this.numberOfElements = 0
    this.first = false
  }
}