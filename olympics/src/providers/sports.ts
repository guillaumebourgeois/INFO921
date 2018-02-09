import { Injectable } from '@angular/core';

export interface Sport {
    name: string,
    code: string,
    description: string
}

@Injectable() export class Sports
{
    sports: Array<Sport> = [
      {
          name: "Walking",
          code: "walk",
          description: "Relax yourself and walk slowly."
      },
      {
          name: "Running",
          code: "run",
          description: "Run as fast as you can."
      },
      {
          name: "Cycling",
          code: "cycle",
          description: "It's not the right time to do that !"
      },  
      {
          name: "Skiing",
          code: "ski",
          description: "You shall not pass !"
      },
      {
          name: "Riding",
          code: "ride",
          description: "Mount your horse and enjoy your time !"
      }
    ];

    constructor() { }

    public GetSports()
    {
      return this.sports;
    }
}
