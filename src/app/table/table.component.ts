import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NzTableModule,NzDividerComponent,CommonModule,NzButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})


export class TableComponent implements OnInit {

listOfPokemon:Pokemon[]=[];

constructor(private message: NzMessageService) { }

ngOnInit() {
  this.loadFavorites();
}

loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  this.listOfPokemon = favorites;
}

removeFromFavorites(pokemon: Pokemon) {
  this.listOfPokemon = this.listOfPokemon.filter(p => p.id !== pokemon.id);
  localStorage.setItem('favorites', JSON.stringify(this.listOfPokemon));
  this.message.success('Se eliminó correctamente de favoritos');
}

}

