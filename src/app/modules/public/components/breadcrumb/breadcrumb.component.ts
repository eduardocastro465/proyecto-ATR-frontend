import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

interface MenuItem {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
    `
    .ui.breadcrumb .active.section {
      padding:5px;
  font-weight: normal;
}
    .ui.breadcrumb {
  color: gray; // Texto gris para todo el breadcrumb
  display: flex;
  align-items: center;

  .section {
    color: gray;
    text-decoration: none;
    // pointer-events: none; // Deshabilita el enlace
    // cursor: default;

    &:hover {
      color: gray; // Evita que cambie de color al pasar el mouse
    }
  }

 

  .active {
    // font-weight: bold;
    color: darkgray;
  }

  
}

      .ui.breadcrumb {
        margin-left: 11%;

        .section {
          &.active {
            color: #555;
          }
        }

       
      }
    `,
  ],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  menuItems: string[] = [];  // Mantendremos solo los nombres de los breadcrumbs
  subscription!: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.menuItems = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createBreadcrumbs(route: ActivatedRoute, breadcrumbs: string[] = []): string[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map((segment) => segment.path).join('/');

      // Verificamos si hay un "breadcrumb" en los datos de la ruta
      const breadcrumb = child.snapshot.data['breadcrumb'] || child.snapshot.data['title'];

      if (breadcrumb) {
        breadcrumbs.push(breadcrumb);  // Añadimos el nombre del breadcrumb
      }

      return this.createBreadcrumbs(child, breadcrumbs);
    }

    return breadcrumbs;
  }
}
