import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessViewOneComponent } from './pages/business/business-view-one/business-view-one.component';
import { BusinessComponent } from './pages/business/business.component';

const routes: Routes = [
  { component: BusinessComponent, path: 'business', },
  { component: BusinessViewOneComponent, path: 'business/:id' },
  { path: '**', redirectTo: 'business'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
