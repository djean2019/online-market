import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../material/shared';

@NgModule({
  imports: [SharedModule],
  declarations: [AuthComponent],
  providers: [NoAuthGuard],
})
export class AuthModule {}
