import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BusinessService } from 'src/app/services/business.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { IBusiness } from 'src/models/Business';
import { ICEP } from 'src/models/CEP';

interface IFormFields {
  cep: string,
  streetName: string,
  neighborhood: string,
  state: string,
  city: string,
  name: string,
  business: string,
  valuation: string,
  cnpj: string,
  active: boolean,
}

@Component({
  selector: 'app-business-view-one',
  templateUrl: './business-view-one.component.html',
  styleUrls: ['./business-view-one.component.scss']
})
export class BusinessViewOneComponent implements OnInit {

  public form: FormGroup = new FormGroup({
      cep: new FormControl(''),
      streetName: new FormControl(''),
      neighborhood: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      name: new FormControl(''),
      business: new FormControl(''),
      valuation: new FormControl(''),
      cnpj: new FormControl(''),
      active: new FormControl(''),
  });
  public business: IBusiness = {} as IBusiness;
  public cnpj: string | number = '';
  public currentLang: string = '';
  public formValue: IFormFields = {} as IFormFields;

  constructor(
    private businessService: BusinessService,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService,
    private currencyPipe: CurrencyPipe,
    private translateService: TranslateService,
    private router: Router
   ) { }

  ngOnInit(): void {
    this.getBusinessById();
    this.currentLang = this.translateService.currentLang;
  }

  private initFormValues(): void {
    const business = this.business;
    this.form.patchValue({
      cep: business.cep,
      cnpj: business.cnpj,
      name: business.name,
      business: business.business,
      valuation: this.currencyPipe.transform(business.valuation, this.currentLang === 'en' ? 'USD' : 'BRL'),
      active: business.active
    });
  }

  private getBusinessById(): void {
    this.businessService.getBusinessById(this.route.snapshot.params['id']).subscribe((response: IBusiness) => {
      this.business = response;
      this.initFormValues();
    }, (error) => {
      this.snackBarService.openSnackbar(this.translateService.instant("HTTP_STANDARD_ERROR"), 'error', 3000);
    })
  }

  public updateAddressFields(event: ICEP) {
    this.form.patchValue({
      streetName: event.logradouro,
      state: event.uf,
      city: event.localidade,
      neighborhood: event.bairro
    })
  }

  public updateBusiness(): void {
    // Remove caracteres indesejados para salvar a valuation como um numero
    let formBody = this.form.value;
    let currencyLetters = this.translateService.currentLang === 'pt-br' ? 2 : 1;
    formBody['valuation'] = Number(formBody['valuation'].slice(currencyLetters).split(',').join(''));
    setTimeout(() => {
      this.businessService.updateById(this.business.id, this.form.value).subscribe((response) => {
        this.snackBarService.openSnackbar(this.translateService.instant('UPDATE_SUCCESS'), 'sucess', 3000);
        this.router.navigate(['/business']);
      }, (error) => {
        this.snackBarService.openSnackbar(this.translateService.instant("HTTP_STANDARD_ERROR"), 'error', 3000);
      })
    }, 200)
  }

}
