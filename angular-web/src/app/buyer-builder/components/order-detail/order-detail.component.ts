import { Component, OnInit } from "@angular/core";
import { UserService, User } from "src/app/core";
import { concatMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ProductService } from "src/app/core/services/product.service";

@Component({
    selector: "app-order-detail",
    templateUrl: "./order-detail.component.html",
    styleUrls: ["./order-detail.component.css"],
})
export class OrderDetailComponent implements OnInit {
    constructor(
        private userService: UserService,
        private productService: ProductService,
        private router: Router
    ) {}

    IsApproved = false;

    results: any;
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
        this.productService.orderList(this.currentUser._id).subscribe(data => {
            this.loading = false;
            this.results = data.result;
        });
    }

    cancelOrder(orderId) {
        this.productService.cancelOrder(orderId).subscribe(data => {
            this.loading = false;
            this.runQuery();
        });
    }
}
