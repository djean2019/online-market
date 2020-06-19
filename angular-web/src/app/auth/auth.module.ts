import { NgModule } from "@angular/core";

import { AuthComponent } from "./auth.component";
import { NoAuthGuard } from "./no-auth-guard.service";
import { SharedModule } from "../material/shared";
import { MaterialModule } from "../material/material.module";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
    imports: [SharedModule, MaterialModule, MatSelectModule],
    declarations: [AuthComponent],
    providers: [NoAuthGuard],
})
export class AuthModule {}
