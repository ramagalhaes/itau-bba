import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selectedLanguage: 'PT' | 'EN' = 'PT';

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
  }

  public changeLanguage(): void {
    if(this.selectedLanguage === 'PT'){
      this.selectedLanguage = 'EN';
      this.translateService.use('en');
    } else {
      this.selectedLanguage = 'PT';
      this.translateService.use('pt-br');
    }
  }

}
