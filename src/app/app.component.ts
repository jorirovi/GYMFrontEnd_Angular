import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenubarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  Title = 'GYM-APP';
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Login',
              icon: 'pi pi-home',
              routerLink: ['/']
          },
          {
              label: 'Features',
              icon: 'pi pi-star'
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-users',
            items: [
                  {
                      label: 'Listado',
                      icon: 'pi pi-user',
                      routerLink: ['/usuarios']
                  },
                  {
                      label: 'Blocks',
                      icon: 'pi pi-server'
                  },
                  {
                      label: 'UI Kit',
                      icon: 'pi pi-pencil'
                  },
                  {
                      label: 'Templates',
                      icon: 'pi pi-palette',
                      items: [
                            {
                              label: 'Apollo',
                              icon: 'pi pi-palette'
                            },
                            {
                              label: 'Ultima',
                              icon: 'pi pi-palette'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope'
            }
        ]
    }
}
