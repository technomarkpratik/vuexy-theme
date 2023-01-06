import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  /**
   * Constructor
   *
   * @param {InvoiceAddService} _invoiceAddService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService,private formbuilder:FormBuilder,private http:HttpClient) {

  }
  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  ngOnInit(): void {  
   
  }
  submitdata(regsisterform){
    console.log(regsisterform.value);
 
    this.http.post<any>('http://localhost:3000/regristerUser',regsisterform.value).subscribe(data => {
      console.log(data.toString());
      this.toggleSidebar('add-user');
    });
  }
}
