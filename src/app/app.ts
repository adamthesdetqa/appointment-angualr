import { Component } from '@angular/core';
import { AppointmentItem } from './appointment-item/appointment-item';

@Component({
  selector: 'app-root',
  imports: [AppointmentItem],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
