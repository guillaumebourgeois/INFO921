import {Pipe, PipeTransform} from "@angular/core";
 
/**
 *
 */
@Pipe({name: 'round'})
export class RoundPipe implements PipeTransform {
    /**
     *
     * @param value
     * @returns {number}
     */
    transform(value: number): number {
      let factor = Math.pow(10, 2);
      return Math.round(value * factor) / factor;
    }
}