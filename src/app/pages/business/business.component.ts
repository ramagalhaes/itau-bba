import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BusinessService } from 'src/app/services/business.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { IBusiness } from 'src/models/Business';

interface IColumn {
  title: string;
  value: string;
  type: string;
}

interface IButton {
  title: string;
  icon: string;
  callback(row: IBusiness): any;
}

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit, OnDestroy, AfterViewInit {

  public filter!: string;
  private unsubscriptions: Subscription[]= [];
  public dataSource: MatTableDataSource<IBusiness> = new MatTableDataSource();
  public columnsLoaded: boolean = false;
  public currency: string = '';
  public columns: IColumn[] = [
    { title: 'Name', value: 'name', type: 'string' },
    { title: 'Business', value: 'business', type: 'string' },
    { title: 'Valuation', value: 'valuation', type: 'number' },
    { title: 'Active', value: 'active', type: 'boolean' }
  ];
  public buttons: IButton[] = [
    { title: 'Action', icon: 'visibility', callback: (row) => {this.router.navigate([`/business/${row.id}`])} }
  ];
  public columnsToDisplay = this.columns.map(column => column.title);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private businessService: BusinessService,
    private router: Router,
    private snackBarService: SnackBarService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getAllBusiness();
    this.loadButtons();
    this.setCurrency();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadButtons(): void {
    this.buttons.forEach((button) => {
      this.columnsToDisplay.push(button.title)
    });
  }

  // Limpar as subscriptions para não ter algum problema de porformance ou memória
  ngOnDestroy(): void {
    this.unsubscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }

  private getAllBusiness(): void {
    this.unsubscriptions.push(
      this.businessService.getAllBusiness().subscribe((response) => {
        this.dataSource.data = response;
        this.columnsLoaded = true;
      },(error) => {
        this.snackBarService.openSnackbar(this.translateService.instant("HTTP_STANDARD_ERROR"), 'error', 3000);
      })
    );
  }

  public filterTable(event: any): void {
    this.dataSource.filter = event.value.toLowerCase();
  }

  private setCurrency(): void {
    const currentLang = this.translateService.currentLang;
    this.currency = currentLang === 'pt-br' ? 'BRL' : 'USD'
  }

}
