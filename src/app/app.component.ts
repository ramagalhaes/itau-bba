import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'itau';
  
  supportLanguages: string[] = ['en', 'pt-br'];

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('pt-br');
    this.translateService.currentLang = 'pt-br';
  }
}
