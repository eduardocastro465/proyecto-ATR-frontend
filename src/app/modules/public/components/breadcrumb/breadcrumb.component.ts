// breadcrumb.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: ``,
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs: any[] = [];
  subscription!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = this.getBreadcrumbs();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getBreadcrumbs(): any[] {
    const breadcrumbs: any[] = [];
    const urlParts = this.router.url.split('/');
    urlParts.forEach((part) => {
      if (part !== '') {
        const label = this.getLabelForRoute(part);
        breadcrumbs.push({ label, path: `/${part}` });
      }
    });
    return breadcrumbs;
  }

  getLabelForRoute(routePart: string): string {
    // Implementa lógica para obtener el label correcto basado en la ruta
    // Puedes usar un mapa para relacionar rutas con labels
    return routePart;
  }
}
