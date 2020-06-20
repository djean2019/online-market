import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ApiService } from "./api.service";
import { map } from "rxjs/operators";
import { Product } from "../models/product.modul";
import { ApiResponse } from "../models/api.response";

@Injectable()
export class ProductService {
    constructor(private apiService: ApiService) {}
    //common all people
    queryList(): Observable<Product[]> {
        const route = "/products";
        return this.apiService.get(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    //seller
    queryProdBySeller(sellerId): Observable<ApiResponse> {
        const route = "/seller/" + sellerId + "/products";
        return this.apiService.get(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    addProduct(product): Observable<ApiResponse> {
        const route = "/seller/products";
        return this.apiService.post(route, product).pipe(
            map(data => {
                return data;
            })
        );
    }
    editProduct(productId, pro): Observable<ApiResponse> {
        const route = "/seller/editProducts/" + productId;
        return this.apiService.put(route, pro).pipe(
            map(data => {
                return data;
            })
        );
    }
    deleteProduct(productId): Observable<ApiResponse> {
        const route = "/seller/deleteProducts/" + productId;
        return this.apiService.delete(route).pipe(
            map(data => {
                return data;
            })
        );
    }
    getProductById(productId): Observable<Product> {
        const route = "/seller/products/" + productId;
        return this.apiService.get(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    //buyer
    queryCart(buyerId): Observable<ApiResponse> {
        const route = "/buyer/" + buyerId + "/cart";
        return this.apiService.get(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    removeFromCart(buyerId, prodId): Observable<ApiResponse> {
        const route = "/buyer/cart/" + buyerId + "/" + prodId;
        return this.apiService.post(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    removeAll(buyerId): Observable<ApiResponse> {
        const route = "/buyer/cart/" + buyerId;
        return this.apiService.delete(route).pipe(
            map(data => {
                return data;
            })
        );
    }

    addToCart(buyId, prodId): Observable<ApiResponse> {
        const route = "/buyer/" + buyId + "/" + prodId;
        return this.apiService.post(route);
    }
}
