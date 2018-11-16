import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // get id from route
    this.id = this.route.snapshot.params['id'];

    // fetch client using id
    this.clientService.getClient(this.id).subscribe(client => this.client = client);
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      // show error
      this.flashMessage.show('Please fill out the form correctly!', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // update client
      this.clientService.updateClient(this.client);

      // show message
      this.flashMessage.show('Client updated successfully!', {
        cssClass: 'alert-success', timeout: 4000
      });
      // redirect to client details
      this.router.navigate(['/client/' + this.id]);
    }

  }

}
