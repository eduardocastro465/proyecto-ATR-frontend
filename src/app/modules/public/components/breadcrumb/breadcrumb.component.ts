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
      .ui.breadcrumb {
        margin-left: 11%;

        .section {
          &.active {
            color: pink;
          }
        }

        .divider {
          color: inherit;
          font-size: 0.8em;

          i {
            font-size: 0.8em;
          }
        }
      }
    `,
  ],
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  menuItems: string[] = [];  // Mantendremos solo los nombres de los breadcrumbs
  subscription!: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

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
