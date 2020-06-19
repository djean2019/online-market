import { Component, OnInit, Output, EventEmitter, NgZone } from "@angular/core";
import { User, UserService } from "../../../core";
import { Router, ActivatedRoute } from "@angular/router";

const MAX_WIDTH_BREAKPOINT = 720;

@Component({
    selector: "app-tool-bar",
    templateUrl: "./tool-bar.component.html",
    styleUrls: ["./tool-bar.component.css"],
})
export class ToolBarComponent implements OnInit {
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${MAX_WIDTH_BREAKPOINT}px)`);
    links = [];
    menu = "menu_open";
    currentUser: User;

    @Output() toggleSidenav = new EventEmitter();
    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        zone: NgZone
    ) {
        this.mediaMatcher.addListener(mql => {
            zone.run(x => (x.mediaMatcher = mql));
        });
    }

    changeMeanu() {
        if (this.menu === "menu") {
            this.menu = "menu_open";
        } else {
            this.menu = "menu";
        }
    }

    ngOnInit() {
        this.userService.currentUser.subscribe(userData => {
            this.currentUser = userData;
        });
    }

    logout() {
        this.userService.purgeAuth();
        this.router.navigateByUrl("/");
    }

    isScreenSmall() {
        return this.mediaMatcher.matches;
    }
}
