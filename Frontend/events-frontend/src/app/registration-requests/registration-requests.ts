import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from './model/registrationRequest';
import {RegistrationRequestsService} from './registration-requests-service';

@Component({
  selector: 'app-registration-requests',
  standalone: false,
  templateUrl: './registration-requests.html',
  styleUrl: './registration-requests.css'
})
export class RegistrationRequests implements OnInit {

  registrationRequests: RegistrationRequest[] = []

  constructor(private service: RegistrationRequestsService) {

  }

  ngOnInit(): void {
    this.getAllRequests();
  }

  getAllRequests(): void {
    this.service.getAll().subscribe({
      next: (registrationRequests: RegistrationRequest[]) => {
        this.registrationRequests = registrationRequests
        console.log(this.registrationRequests)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

}
