import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/core/services/product.service";
import { Product } from "src/app/core/models/product.modul";
import { UserService, User, Errors } from "src/app/core";
import { of } from "rxjs";
import { concatMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { Cart } from "src/app/core/models/cart.module";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: "app-products",
    templateUrl: "./products.component.html",
    styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
    constructor(
        private productService: ProductService,
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit() {
        this.userService.currentUser.subscribe(userData => {
            this.currentUser = userData;
        });
        this.runQuery();
    }

    results: Product[];
    loading = false;
    currentUser: User;

    runQuery() {
        this.loading = true;
        this.results = [];
        this.productService.queryProdBySeller(this.currentUser._id).subscribe(data => {
            this.loading = false;
            this.results = data.result;
        });
    }
}
