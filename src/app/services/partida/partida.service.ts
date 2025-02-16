import { Injectable, WritableSignal, signal } from '@angular/core';
import { Partida } from 'src/app/interfaces/partida';
import { SqliteService } from '../sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  private partida: WritableSignal<Partida[]> = signal<Partida[]>([]);

  constructor(
    private sqliteService: SqliteService
  ) { }

  async loadPartida() {
    const db = this.sqliteService.getDatabaseConnection();
    const partida = await db.query('SELECT * FROM personajes;');
    this.partida.set(partida.values || []);
  }

  getPartida() {
    return this.partida;
  }

  async hayPartidaEnCurso(): Promise<boolean> {
    const db = this.sqliteService.getDatabaseConnection();
    const query = `SELECT * FROM partida WHERE enCurso = 1;`;
    console.log('Aqui llega para comprobar partida en curso');

    try {
      const result = await db.query(query);
      console.log('Antes del if');
      if (result.values && result.values.length > 0) {
        console.log('Despues del if');
        return result.values[0].enCurso === 1;
      } else {
        console.log('Despues del else');
        return false;
      }
    } catch (error) {
      console.error('Error al verificar partida en curso:', error);
      return false;
    }
  }

  async empezarPartida() {
    const db = this.sqliteService.getDatabaseConnection();
    const query = `UPDATE partida SET enCurso = 1`;
    await db.execute(query);
  }
}
