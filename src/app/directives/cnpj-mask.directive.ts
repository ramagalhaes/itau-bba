import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCnpjMask]'
})
export class CnpjMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onCNPJInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: any) {
    this.onCNPJInputChange(event.target.value, true);
  }

  public onCNPJInputChange(event: any, backspace: any) {
    let newVal = event.replace(/\D/g, '');
    if (backspace) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 2) {
      newVal = newVal.replace(/^(\d{0,2})/, '$1.');
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,3})/, '$1.$2.');
    } else if (newVal.length <= 10) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})/, '$1.$2.$3/');
    } 
      else if (newVal.length <= 15){
        newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})/, '$1.$2.$3/$4-');
      }
    else{
      newVal = newVal.substring(0, 16);
    }
    this.ngControl.valueAccessor?.writeValue(newVal)
  }

}
