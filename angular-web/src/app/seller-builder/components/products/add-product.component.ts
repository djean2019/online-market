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
    selector: "app-add-product",
    templateUrl: "./add-product.component.html",
    styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
    title = "Add Product";
    errors: Errors = { errors: {} };
    isSubmitting = false;
    authForm: FormGroup;
    currentUser: User;
    userId: string;

    constructor(
        private productService: ProductService,
        private userService: UserService,
        private router: Router,
        private fb: FormBuilder
    ) {
        // use FormBuilder to create a form group
        this.authForm = this.fb.group({
            price: this.priceFormControl,
            name: this.productNameFormControl,
            imageUrl: this.imageUrlFormControl,
            description: this.descriptionFormControl,
            userId: [""],
        });
    }
    ngOnInit() {
        this.userService.currentUser.subscribe(userData => {
            this.currentUser = userData;
        });
    }

    descriptionFormControl = new FormControl("");
    priceFormControl = new FormControl("", [Validators.required]);
    productNameFormControl = new FormControl("", [Validators.required]);
    imageUrlFormControl = new FormControl("", [Validators.required]);

    submitForm() {
        this.isSubmitting = true;
        this.errors = { errors: {} };

        const credentials = this.authForm.value;
        this.authForm.value.userId = this.currentUser._id;
        this.productService.addProduct(credentials).subscribe(
            data => this.router.navigateByUrl("/"),
            err => {
                this.errors = err;
                this.isSubmitting = false;
            }
        );
    }

    addProduct() {
        const product = this.authForm.value;
        this.productService.addProduct(product).subscribe(
            data => {
                this.router.navigateByUrl("/");
                this.isSubmitting = true;
                this.errors = { errors: {} };
            },
            err => {}
        );
    }
}
