import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/core/services/product.service";
import { Product } from "src/app/core/models/product.modul";

@Component({
    selector: "app-main-content",
    templateUrl: "./main-content.component.html",
    styleUrls: ["./main-content.component.css"],
})
export class MainContentComponent implements OnInit {
    constructor(private productService: ProductService) {}

    results: Product[];
    loading = false;
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
}
