import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], input: string): any {
    return value.filter(it => it['name'].toLowerCase().indexOf(input.toLowerCase()) != -1)
  }

}
