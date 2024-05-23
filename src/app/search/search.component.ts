import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,NzButtonComponent,FormsModule,NzInputModule,NzListModule,NzSpinModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm: string ='';
  pokemon:any;
  isLoading: boolean = false;
  error: string ='';

  constructor(private pokemonService: PokemonService, private message: NzMessageService){}

  search(){
    this.isLoading = true;
    this.error = '';
    this.pokemon = null;

    if (!isNaN(Number(this.searchTerm))) {
      const id = Number(this.searchTerm);
      this.pokemonService.searchPokemonById(id).subscribe({
        next: (data) => {
          this.pokemon = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'No se encontró el Pokémon';
          this.isLoading = false;
        }
      });
    } else {
      this.pokemonService.searchPokemonByName(this.searchTerm).subscribe({
        next: (data) => {
          this.pokemon = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'No se encontró el Pokémon';
          this.isLoading = false;
        }
      });
    }

    
  }

  addToFavorites() {
    const favoritePokemon = {
      id: this.pokemon.id,
      name: this.pokemon.name,
      type: this.getPokemonTypes(this.pokemon),
      photo: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.pokemon.id}.png`
    };

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites.push(favoritePokemon);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.message.success('Se agregó correctamente a favoritos');
  }

  getPokemonTypes(pokemon: any): string {
    return pokemon.types.map((typeInfo: any) => typeInfo.type.name).join(', ');
  }
}
