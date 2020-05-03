import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-info-vendedor',
  templateUrl: './info-vendedor.page.html',
  styleUrls: ['./info-vendedor.page.scss'],
})
export class InfoVendedorPage implements OnInit {
  vendedor:any;

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getObject('codigo_vendedor').then(async result => {   
      console.log(result);
    });
  }

}
