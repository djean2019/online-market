import { Component, OnInit } from "@angular/core";
import { UserService, User } from "src/app/core";
import { concatMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Cart } from "src/app/core/models/cart.module";

@Component({
    selector: "app-cart",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
    constructor(private userService: UserService, private router: Router) {}

    IsApproved = false;

    results: User[];
    loading = false;
    currentUser: User;
    ngOnInit(): void {
        this.userService.currentUser.subscribe(userData => {
            this.currentUser = userData;
        });
        this.runQuery();
    }

    runQuery() {
        this.loading = true;
        this.results = [];
        this.userService.getUsers().subscribe(data => {
            this.loading = false;
            this.results = data.result;
        });
    }
    changeApproStatus(isAppro, userId) {
        this.userService.approveSeller(!isAppro, userId).subscribe(data => {
            this.loading = false;
            this.results = data.result;
        });
    }
}
