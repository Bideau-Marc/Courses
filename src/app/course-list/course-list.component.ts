import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'], // Corrige le nom de l'attribut
})
export class CourseListComponent {
  articles: string[] = [];
  newArticle: string = ''; // Stocke le nouvel article
  numberOfArticles: number = 3; // Nombre d'articles à générer
  generatedArticles: string[] = []; // Stocke les articles générés
  @Output() articlesChange = new EventEmitter<string[]>(); // Émet les articles

  constructor() {
    const storedList = localStorage.getItem('shoppingList');
    this.articles = storedList ? JSON.parse(storedList) : ['Pommes', 'Bananes', 'Carottes'];
    this.emitArticles(); // Émet la liste d'articles initiale
  }

  removeArticle(article: string) {
    this.articles = this.articles.filter(a => a !== article);
    this.emitArticles(); // Émettre la liste après suppression
  }

  // Ajouter un nouvel article
  addArticle() {
    if (this.newArticle.trim() !== '') { // Vérifie que le champ n'est pas vide
      this.articles.push(this.newArticle.trim());
      this.newArticle = ''; // Réinitialiser l'input
      localStorage.setItem('shoppingList', JSON.stringify(this.articles)); // Mettre à jour le localStorage
      this.emitArticles(); // Émettre la liste après ajout
    }
  }

  // Générer une liste aléatoire d'articles
  generateRandomList() {
    const count = Math.min(this.numberOfArticles, this.articles.length);
    this.generatedArticles = this.shuffleArray([...this.articles]).slice(0, count);
  }

  // Méthode pour mélanger un tableau
  private shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  emitArticles() {
    this.articlesChange.emit(this.articles); // Émet les articles à chaque changement
  }
}
