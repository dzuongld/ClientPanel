import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // get id from route
    this.id = this.route.snapshot.params['id'];

    // fetch client using id
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null && client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
    });
  }

  onDelete() {
    if (confirm('Delete this client?')) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client Deleted!', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance Updated!', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

}
