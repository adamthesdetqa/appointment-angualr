import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentInterface } from '../models/appointment';

@Component({
  selector: 'app-appointment-item',
  imports: [FormsModule],
  templateUrl: './appointment-item.html',
  styleUrl: './appointment-item.scss'
})
export class AppointmentItem implements OnInit {
  newAppointmentTitle: string = '';
  newAppointmentDate: Date = new Date();
  newAppointmentDescription: string = '';
  appointmentsList: AppointmentInterface[] = [];

  ngOnInit() {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      this.appointmentsList = JSON.parse(storedAppointments);
    }
  }
  /**
   * Adds a new appointment to the appointments list.
   *
   * This method validates the input fields for title, description, and date.
   * If all fields are filled, it creates a new appointment object, adds it to
   * the appointments array, and updates local storage. Otherwise, it notifies
   * the user to fill in all fields.
   */
  addAppointment() {
    const appointmentData: AppointmentInterface = {
      id: Date.now(),
      title: this.newAppointmentTitle,
      date: this.newAppointmentDate,
      description: this.newAppointmentDescription
    };
    if (
      this.newAppointmentTitle.trim().length && this.newAppointmentDescription.trim().length && this.newAppointmentDate
    ) {
      this.appointmentsList.push(appointmentData);
      localStorage.setItem('appointments', JSON.stringify(this.appointmentsList));
      this.newAppointmentTitle = '';
      this.newAppointmentDate = new Date();
      this.newAppointmentDescription = '';
    } else {
      alert('Please fill in all fields before adding an appointment.');
    }
  }
  /**
   * Deletes an appointment from the appointments list by its ID.
   *
   * This method removes the appointment with the specified ID from the
   * appointments array and updates the local storage to persist the change.
   *
   * @param appointmentId - The unique identifier of the appointment to delete.
   */
  deleteAppointment(appointmentId: number) {
    this.appointmentsList = this.appointmentsList.filter((appointment) => appointment.id !== appointmentId);
    localStorage.setItem('appointments', JSON.stringify(this.appointmentsList));
  }
}
