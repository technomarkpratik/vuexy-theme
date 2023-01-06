import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

import { CoreTranslationService } from '@core/services/translation.service';

import { locale as german } from 'app/main/tables/datatables/i18n/de';
import { locale as english } from 'app/main/tables/datatables/i18n/en';
import { locale as french } from 'app/main/tables/datatables/i18n/fr';
import { locale as portuguese } from 'app/main/tables/datatables/i18n/pt';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppUserComponent implements OnInit {

  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];

  // public
  public rows: any;
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public editingName = {};
  public editingStatus = {};
  public SelectionType = SelectionType;
  public exportCSVData = [];
  public searchValue = '';
  
  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  /**
   * Filter Rows
   *
   * @param statusFilter
   */
  filterRows(statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';
    statusFilter = statusFilter.toLowerCase();
    return this.rows.filter(row => {
      const isPartialNameMatch = row.invoiceStatus.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch;
    });
  }

  /**
   * Search (filter)
   *
   * @param event
   * 
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
    
    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }



  /**
   * Constructor
   *
   * @param {UserService} UserService
   * @param {CoreTranslationService} _coreTranslationService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private UserService: UserService, private _coreTranslationService: CoreTranslationService,private http:HttpClient, private _coreSidebarService: CoreSidebarService) {
    this._unsubscribeAll = new Subject();
    this._coreTranslationService.translate(english, french, german, portuguese);
  }
   /**
   * Toggle the sidebar
   *
   * @param name
   */
   toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {

    this.http.get('http://localhost:3000/regristerUser').pipe(takeUntil(this._unsubscribeAll)).subscribe(data => { 
      this.rows = data;
      this.tempData = this.rows;
      this.kitchenSinkRows = this.rows;
      this.exportCSVData = this.rows;
  });
    // this.UserService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.rows = response;
  
    //   this.tempData = this.rows;
    //   this.kitchenSinkRows = this.rows;
    //   this.exportCSVData = this.rows;
    // });


  }
}
