import { Injectable } from '@angular/core';

@Injectable() export class Sports
{
    sports: Array<any> = [
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

    constructor()
    {
    }

    public GetSports()
    {
      return this.sports;
    }
}
