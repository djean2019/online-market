import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/core/services/product.service";
import { Product } from "src/app/core/models/product.modul";
import { UserService, User } from "src/app/core";
import { of } from "rxjs";
import { concatMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";

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

    results: Product[];
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
        this.productService.queryCart(this.currentUser._id).pipe(
            tap(data => {
                this.loading = false;
                this.results = data;
            })
        );
    }

    addToCart(prodId) {
        this.userService.isAuthenticated
            .pipe(
                concatMap(authenticated => {
                    // Not authenticated? Push to login screen
                    if (!authenticated) {
                        this.router.navigateByUrl("/login");
                        return of(null);
                    }

                    return this.productService.addToCart(this.currentUser._id, prodId).pipe(
                        tap(data => {
                            console.log(data);
                        })
                    );
                    //     // Otherwise, unfavorite the article
                    // } else {
                    //     return this.articlesService.unfavorite(this.article.slug).pipe(
                    //         tap(
                    //             data => {
                    //                 this.isSubmitting = false;
                    //                 this.toggle.emit(false);
                    //             },
                    //             err => (this.isSubmitting = false)
                    //         )
                    //     );
                    // }
                })
            )
            .subscribe();
    }

    buy() {
        this.userService.isAuthenticated
            .pipe(
                concatMap(authenticated => {
                    // Not authenticated? Push to login screen
                    if (!authenticated) {
                        this.router.navigateByUrl("/login");
                        return of(null);
                    }
                })
            )
            .subscribe();
    }
}
