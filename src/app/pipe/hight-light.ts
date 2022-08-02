import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})
export class highlight implements PipeTransform {

    transform(value: any, value2: any): any {
        if (!value2) return (value)
        let regex = new RegExp(value2, 'gi');
        return value.replace(regex, "<mark>$&</mark>")
    }

}