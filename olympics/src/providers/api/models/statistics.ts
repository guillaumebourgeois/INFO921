export interface Statistics {
  avgDistance: number
  longestDistance: number
  longestDuration: number
  shortestDuration: number
  avgDuration: number
}

export class Statistics implements Statistics {
  constructor() {
    this.avgDistance = 0
    this.longestDistance = 0
    this.longestDuration = 0
    this.shortestDuration = 0
    this.avgDuration = 0 
  }
}