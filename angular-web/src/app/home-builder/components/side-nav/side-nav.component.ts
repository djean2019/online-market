import { Component, OnInit, NgZone, ViewChild, ElementRef } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { UserService, User } from "src/app/core";
const MAX_WIDTH_BREAKPOINT = 720;

@Component({
    selector: "app-side-nav",
    templateUrl: "./side-nav.component.html",
    styleUrls: ["./side-nav.component.css"],
})
export class SideNavComponent implements OnInit {
    @ViewChild("sidenav") sidenav: MatSidenav;
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${MAX_WIDTH_BREAKPOINT}px)`);

    links = [];

    constructor(zone: NgZone, private userService: UserService) {
        this.mediaMatcher.addListener(mql => {
            zone.run(x => (x.mediaMatcher = mql));
        });
    }
    currentUser: User;
    ngOnInit() {
        this.userService.currentUser.subscribe(userData => {
            this.currentUser = userData;
            this.links = [
                { name: "Home", url: "" },
                {
                    name: "Shopping Cart",
                    url: "manageCart",
                },
                {
                    name: "Manage Orders",
                    url: "manageOrders",
                },
            ];
            if (this.currentUser.role === "SELLER") {
                this.links.push(
                    {
                        name: "My Products",
                        url: "manageProducts",
                    },
                    {
                        name: "My Product's Order",
                        url: "manageSellerOrder",
                    }
                );
            } else if (this.currentUser.role === "BUYER") {
                //this.links.push();
            } else {
                this.links.push(
                    {
                        name: "Manage Sellers",
                        url: "manageSellers",
                    },
                    {
                        name: "Manage Reviews",
                        url: "manageReviews",
                    }
                );
            }
        });
    }

    isScreenSmall() {
        return this.mediaMatcher.matches;
    }
}
