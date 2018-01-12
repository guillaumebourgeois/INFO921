import { Injectable } from '@angular/core';

@Injectable() export class Sports
{
    sports: Array<any> = [
                            {name:"Walking", icon:"walk"},
                            {name:"Running", icon:""},
                            {name:"Cycling", icon:"bicycle"},
                            {name:"Skiing", icon:""},
                            {name:"Riding", icon:""}
                          ];
    constructor()
    {
    }

    public GetSports()
    {
      return this.sports;
    }
}
