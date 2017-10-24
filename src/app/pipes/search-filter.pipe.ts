import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

 transform(items: any[], field: string, value: string): any[] {
  /* debugger;
   if (!items) return [];
   var k= items.filter(it => it[field] == value);
   return k;*/
   
   //return items.filter(items => items[field].toLowerCase().indexOf(value.toLowerCase()) !== -1);

   //public transform(value, keys: string, term: string) {
     //<div *ngFor="let item of items | search:'id,text':query">{{item.text}}</div> Para multiples columnas
   return (items || []).filter((item) => field.split(',').some(key => item.hasOwnProperty(key) && new RegExp(value, 'gi').test(item[key])));

 }

}
