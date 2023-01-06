import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CoreCommonModule } from '@core/common.module';
import { SettingsComponent } from './settings.component';
import { RouterModule, Routes } from '@angular/router';
import { AppUserComponent } from './app-user/app-user.component';
import { CpaComponent } from './cpa/cpa.component';
import { ClientComponent } from './client/client.component';
import { TaskComponent } from './task/task.component';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { CsvModule } from '@ctrl/ngx-csv';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { AddUserComponent } from './app-user/add-user/add-user.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { UserService } from './app-user/user.service';
import { SettingsService } from './settings.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreSidebarModule } from '@core/components';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';

const routes: Routes = [
  {
    path: '**',
    component: SettingsComponent,
    resolve: {
      userData: UserService,
    },
    data: { animation: 'chat' }
  },
];
@NgModule({
  declarations: [SettingsComponent, AppUserComponent, CpaComponent, ClientComponent, TaskComponent, AddUserComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    PerfectScrollbarModule,
    CoreCommonModule,
    NgApexchartsModule,
    ContentHeaderModule,
    CardSnippetModule,
    NgxDatatableModule,
    CsvModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    CoreSidebarModule,
    NgSelectModule,
    FormsModule,
    CoreDirectivesModule,
    CorePipesModule,
    ReactiveFormsModule

  ],
  providers: [
    SettingsService,
    UserService,
  ],
  exports: []
})
export class SettingsModule {
  constructor() {
   
  }
}
