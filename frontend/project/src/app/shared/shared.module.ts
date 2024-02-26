import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationComponent } from './pagination/pagination.component';




@NgModule({
  declarations: [
    AgentDetailsComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,FormsModule,BrowserAnimationsModule,CalendarModule
  ],
  exports:[AgentDetailsComponent,PaginationComponent]
})
export class SharedModule { }
