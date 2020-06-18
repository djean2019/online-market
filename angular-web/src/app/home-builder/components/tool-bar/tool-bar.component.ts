import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User, UserService } from '../../../core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
})
export class ToolBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  constructor(private userService: UserService) {}

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
    });
  }
}
