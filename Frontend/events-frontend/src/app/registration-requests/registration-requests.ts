import {Component, OnInit} from '@angular/core';
import {RegistrationRequest} from './model/registrationRequest';
import {RegistrationRequestsService} from './registration-requests-service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-registration-requests',
  standalone: false,
  templateUrl: './registration-requests.html',
  styleUrl: './registration-requests.css'
})
export class RegistrationRequests implements OnInit {

  registrationRequests: RegistrationRequest[] = []

  constructor(private service: RegistrationRequestsService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.getAllRequests();
  }

  accept(id: number): void {
    this.service.accept(id).subscribe({
      next: () => {
        this.router.navigate(['registrationrequests'])
        this.getAllRequests()
        console.log("USPEH!")
      }
    });
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
