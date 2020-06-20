import { Component, OnInit } from "@angular/core";
import { UserService, User } from "src/app/core";
import { Order } from "src/app/core/models/order.module";
import { concatMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ProductService } from "src/app/core/services/product.service";

@Component({
    selector: "app-seller-order-detail",
    templateUrl: "./seller-order-detail.component.html",
    styleUrls: ["./seller-order-detail.component.css"],
})
export class SellerOrderDetailComponent implements OnInit {
    constructor(
        private userService: UserService,
        private productService: ProductService,
        private router: Router
    ) {}

    IsApproved = false;

    results: Order[];
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
        this.productService.sellerOrderList(this.currentUser._id).subscribe(data => {
            this.loading = false;
            this.results = data.result;
        });
    }

    changeOrder(orderId) {
        this.productService.cancelOrder(orderId).subscribe(data => {
            this.loading = false;
            this.runQuery();
        });
    }
}
