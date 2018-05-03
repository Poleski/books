import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';
import { DummyComponent } from './dummy/dummy.component';
import { SortableService } from './sortable/sortable.service';
import { SortableTableDirective } from './sortable/sortable.directive';
import { SortableColumnComponent } from './sortable/sortable.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MessageComponent,
    DummyComponent,
    SortableTableDirective,
    SortableColumnComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SortableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
