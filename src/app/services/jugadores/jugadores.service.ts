import { Injectable, WritableSignal, signal } from '@angular/core';
import { Jugador } from 'src/app/interfaces/jugador';
import { SqliteService } from '../sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private jugadores: WritableSignal<Jugador[]> = signal<Jugador[]>([]);

  constructor(private sqliteService: SqliteService) { }

  // async loadJugadores() {
  //   const db = this.sqliteService.getDatabaseConnection();
  //   if(db) {
  //     const jugadores = await db.query('SELECT * FROM jugadores;');
  //     this.jugadores.set(jugadores.values || []);
  //   }
  // }

  async loadJugadores() {
    try {
      const db = this.sqliteService.getDatabaseConnection();
      if(!db) {
        throw new Error('No hay conexión a la base de datos.');
      }

      const jugadores = await db.query('SELECT * FROM jugadores;');
      
      this.jugadores.set(jugadores.values ? jugadores.values as Jugador[] : []);
      console.log('Jugadores cargados:', JSON.stringify(this.jugadores, null,2));
    } catch (error) {
      console.error('Error al cargar los jugadores:', error);
    }
  }

  async addJugador(nombre: string) {
    const db = this.sqliteService.getDatabaseConnection();

    if (db) {
      try {
        const query = `INSERT INTO jugadores (nombre_jugador) VALUES ('${nombre}')`;
        await db.execute(query);
        
        await this.loadJugadores();
        console.log('Jugador añadido: ', nombre);
      } catch (error) {
        console.error('Error al añadir el jugador: ', error);
        throw error;
      }
    } else {
      console.error('Error al conectar a la BD en addJugador.')
    }
  }

  getJugadores() {
    console.log('Cantidad de jugadores:', this.jugadores().length);
    return this.jugadores;
  }

  async setNombreJugador(nombre: string, id: number) {
    try {
      const db = this.sqliteService.getDatabaseConnection();

      if (!db) {
        throw new Error('No hay conexión a la base de datos.');
      }

      const query = `
        UPDATE jugadores
        SET nombre_jugador = ('${nombre}')
        WHERE id = ('${id}')
        `;
      const result = await db.query(query);
      
      this.loadJugadores();
      console.log('Nombre del jugador modificado.');

      return result;
    } catch (error) {
      console.log('Error al cambiar el nombre del jugador:', error);
      return undefined;
    }
  }
}
