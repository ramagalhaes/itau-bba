import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCepMask]'
})
export class CepMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event: any) {
    this.onCEPInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event: any) {
    this.onCEPInputChange(event.target.value, true);
  }

  public onCEPInputChange(event: any, backspace: any) {
    let newVal = event.replace(/\D/g, '');
    if (backspace) {
      newVal = newVal.substring(0, newVal.length - 1);
    }
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length <= 5) {
      newVal = newVal.replace(/^(\d{0,5})/, '$1-');
    }
    else if(newVal.length <= 9) {
      newVal = newVal.replace(/^(\d{0,5})(\d{0,3})/, '$1-$2');
    }
    else{
      newVal = newVal.substring(0, 9);
    }
    this.ngControl.valueAccessor?.writeValue(newVal)
  }

}
