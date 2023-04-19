import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersService } from 'src/app/services/players.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime } from 'rxjs';
import { Player } from 'src/app/commons/interfaces/player.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  _playerService = inject(PlayersService);
  players$!: Observable<Player[]>
  searcher = new FormControl('');
  _router = inject(Router);

  ngOnInit() {
    //Carga inicial de la tabla de jugadores:
    this.players$ = this._playerService.getPlayer();

    this.searcher.valueChanges
      .pipe(
        debounceTime(1000)
      )
      .subscribe( search => {
        if (search) {
          this.players$ = this._playerService.getPlayer(search);
        } else {
          this.players$ = this._playerService.getPlayer();
        }
      });
  }

  addPlayer(player: Player){
    this._router.navigateByUrl('users/add');
  }

  editPlayer(player: Player) {
    this._router.navigateByUrl('users/edit', { state: { player }});
  };

  deletePlayer(player: Player) {
    if (confirm(`Está seguro de eliminar al jugador ${player.name}?`)) {
      this._playerService.deletePlayer(player.id);
    }
  };

}
