import { Component, OnInit } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public paymentDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    defaultDate: ['2020-05-01'],
    altFormat: 'Y-n-j'
  };

  /**
   * Constructor
   *
   * @param {InvoiceAddService} _invoiceAddService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService) {
    let name="add-user"
    console.log("this._coreSidebarService.getSidebarRegistry(name)",this._coreSidebarService.getSidebarRegistry(name))
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    console.log("name",name)
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  ngOnInit(): void {}

}
