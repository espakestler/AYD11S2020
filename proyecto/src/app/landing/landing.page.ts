import { Component, OnInit } from '@angular/core';

import { StorageService } from '../storage.service'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit() {
  }

  clear()
  {
    this.storageService.clear()
    console.log('Clean')
  }

}
