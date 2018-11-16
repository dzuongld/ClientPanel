import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe((clients) => this.clients = clients);
  }

}
