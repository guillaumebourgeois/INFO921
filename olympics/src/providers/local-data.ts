import { Injectable } from '@angular/core';

@Injectable() export class LocalData
{
  constructor()
  {
  }

  public Get(name: string)
  {
    return window.localStorage.getItem(name);
  }

  public Set(name: string, value: string)
  {
    window.localStorage.setItem(name, value);
  }
}
