import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/core/services/product.service";
import { Product } from "src/app/core/models/product.modul";
import { UserService, User } from "src/app/core";
import { of } from "rxjs";
import { concatMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Cart } from "src/app/core/models/cart.module";

@Component({
    selector: "app-cart",
    templateUrl: "./cart.component.html",
    styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private userService: UserService,
        private router: Router
    ) {}

    results: Cart[];
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
        this.productService.queryCart(this.currentUser._id).subscribe(data => {
            this.loading = false;
            this.results = data.result[0].cart;
        });
    }
    remove(prodId) {
        this.loading = true;
        this.results = [];
        this.productService
            .removeFromCart(this.currentUser._id, prodId)
            .subscribe(data => this.runQuery());
    }
    removeAll() {
        this.loading = true;
        this.results = [];
        this.productService.removeAll(this.currentUser._id).subscribe(data => this.runQuery());
    }

    placeOrder(prodId) {
        this.userService.isAuthenticated
            .pipe(
                concatMap(authenticated => {
                    // Not authenticated? Push to login screen
                    if (!authenticated) {
                        this.router.navigateByUrl("/login");
                        return of(null);
                    }

                    this.router.navigateByUrl("/placeAnOrder?id=" + prodId);
                })
            )
            .subscribe();
    }

    placeOrder() {
        this.userService.isAuthenticated
            .pipe(
                concatMap(authenticated => {
                    // Not authenticated? Push to login screen
                    if (!authenticated) {
                        this.router.navigateByUrl("/login");
                        return of(null);
                    }

                    return this.productService.placeOrder(this.currentUser._id).pipe(
                        tap(data => {
                            // console.log(data);
                            this.runQuery()
                        })
                    );
                })
            )
            .subscribe();
    }
}
