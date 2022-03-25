import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CepService } from 'src/app/services/cep.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { ICEP } from 'src/models/CEP';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss']
})
export class CepComponent implements OnInit {

  @Input()
  public controlName: string = '';
  public form!: FormGroup;
  public control!: FormControl;

  @Output()
  public cepEvent: EventEmitter<ICEP> = new EventEmitter<ICEP>();

  constructor(
    private cepService: CepService,
    private controlContainer: ControlContainer,
    private snackBarService: SnackBarService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.sefFormAndControl();
    setTimeout(() => {
      this.getAddressByCep(this.control.value)
    }, 200)
  }

  private getAddressByCep(cep: string): void {
    this.cepService.getAddress(cep).subscribe((response) => {
      this.cepEvent.emit(response);
    }, (error) => {
      this.snackBarService.openSnackbar(this.translateService.instant("CEP_ERROR"), 'error', 3000);
    })
  }

  private sefFormAndControl(): void {
    this.form = <FormGroup>this.controlContainer.control;
    this.control = <FormControl>this.form.get(this.controlName);
  }
}
