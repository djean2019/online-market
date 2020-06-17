import { Component, OnInit, NgZone } from '@angular/core';
const MAX_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${MAX_WIDTH_BREAKPOINT}px)`
  );

  links = [
    {
      name: 'Products',
      url: 'manageProducts',
    },
    {
      name: 'Orders',
      url: 'manageOrders',
    },
  ];

  constructor(zone: NgZone) {
    this.mediaMatcher.addListener((mql) => {
      zone.run((x) => (x.mediaMatcher = mql));
    });
  }

  ngOnInit(): void {}

  isScreenSmall() {
    return this.mediaMatcher.matches;
  }
}