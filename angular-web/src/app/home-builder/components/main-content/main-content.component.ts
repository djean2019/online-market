import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/core/services/product.service";
import { Product } from "src/app/core/models/product.modul";
import { UserService, User } from "src/app/core";
import { of } from "rxjs";
import { concatMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
    selector: "app-main-content",
    templateUrl: "./main-content.component.html",
    styleUrls: ["./main-content.component.css"],
})
export class MainContentComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private userService: UserService,
        private router: Router
    ) {
        this.userService.currentUser.subscribe(userData => {
            this.currentUser = userData;
        });
    }

    results: Product[];
    loading = false;
    currentUser: User;
    ngOnInit(): void {
        this.runQuery();
    }

    runQuery() {
        this.loading = true;
        this.results = [];
        this.productService.queryList().subscribe(data => {
            this.loading = false;
            this.results = data;
        });
    }

    add(prodId) {
        this.userService.isAuthenticated
            .pipe(
                concatMap(authenticated => {
                    // Not authenticated? Push to login screen
                    if (!authenticated) {
                        this.router.navigateByUrl("/login");
                        return of(null);
                    }

                    this.productService.addToCart(this.currentUser._id, prodId).subscribe(data => {
                        console.log(data);
                        return this.router.navigateByUrl("/manageCart");
                    });
                })
            )
            .subscribe();
    }
    buy(prodId) {
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
}
