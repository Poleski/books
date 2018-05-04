import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';
import { MessageService } from './message/message.service';
import { DummyService } from './dummy/dummy.service';
import { SortableService } from './sortable/sortable.service';
import { SortableTableDirective } from './sortable/sortable.directive';
import { SortableColumnComponent } from './sortable/sortable.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MessageComponent,
    SortableTableDirective,
    SortableColumnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [MessageService, DummyService, SortableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
