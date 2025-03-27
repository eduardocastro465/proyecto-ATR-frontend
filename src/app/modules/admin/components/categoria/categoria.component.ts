import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../../shared/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  categorias: any[] = [];
  categoriaSeleccionada: any = null;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
      }
    );
  }

  crearCategoria(categoria: any): void {
    this.categoriaService.crearCategoria(categoria).subscribe(
      (data) => {
        console.log('Categoría creada:', data);
        this.obtenerCategorias(); // Actualizar la lista
      },
      (error) => {
        console.error('Error al crear categoría:', error);
      }
    );
  }

  actualizarCategoria(id: string, categoria: any): void {
    this.categoriaService.actualizarCategoria(id, categoria).subscribe(
      (data) => {
        console.log('Categoría actualizada:', data);
        this.obtenerCategorias(); // Actualizar la lista
      },
      (error) => {
        console.error('Error al actualizar categoría:', error);
      }
    );
  }

  eliminarCategoria(id: string): void {
    this.categoriaService.eliminarCategoria(id).subscribe(
      (data) => {
        console.log('Categoría eliminada:', data);
        this.obtenerCategorias(); // Actualizar la lista
      },
      (error) => {
        console.error('Error al eliminar categoría:', error);
      }
    );
  }
}