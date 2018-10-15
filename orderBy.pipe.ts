import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appsbSort'
})
export class ArraySortPipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    const arrayR: any[] = array || [];
    if (!field || field === '') {
      return arrayR;
    }
    const prop = field.split('.');
    const len = prop.length;
    arrayR.sort((a: any, b: any) => {
      let i = 0;
      while (i < len) {
        a = a[prop[i]] !== undefined ? a[prop[i]] : null;
        b = b[prop[i]] !== undefined ? b[prop[i]] : null;
        i++;
      }
      if (a !== null && b !== null) {
          if (String(a).toUpperCase() < String(b).toUpperCase()) {
            return -1;
          } else if (String(a).toUpperCase() > String(b).toUpperCase()) {
            return 1;
          } else {
            return 0;
          }
        }
    });
    return arrayR;
  }
}
