import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myProjectSort'
})
export class ArraySortPipe implements PipeTransform {
  transform(array: any[], field: string): any[] {
    const arraySorted: any[] = array || [];
    if (!field || field === '') {
      return arraySorted;
    }
    const prop = field.split('.');
    arraySorted.sort((a: any, b: any) => {
      let i = 0;
      while (i < prop.length) {
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
    return arraySorted;
  }
}
