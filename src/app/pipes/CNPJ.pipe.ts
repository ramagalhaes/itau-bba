import { Pipe, PipeTransform } from "@angular/core";


@Pipe({ name: 'CNPJ' })
export class CNPJPipe implements PipeTransform {

    transform(value: string | number, ...args: any[]): string {
        let formattedValue = value.toString();
        formattedValue = formattedValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
        return formattedValue;
    }
}