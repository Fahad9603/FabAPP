import { Component } from '@angular/core';
import { CoreService } from '../../../service/core.service';

@Component({
  selector: 'app-branding',
  standalone: true, 
  imports: [],
  template: `
    <div class="branding d-none d-lg-flex align-items-center">
      <a href="/" class="d-flex">
        <img
          src="./assets/images/logos/logo.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor(private settings: CoreService) {}

  get options() {
    return this.settings.getOptions(); 
}
}