import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AgentDetailsComponent
  ],
  imports: [
    CommonModule,FormsModule,BrowserAnimationsModule,CalendarModule
  ],
  exports:[AgentDetailsComponent]
})
export class SharedModule { }
