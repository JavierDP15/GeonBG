import { Injectable, WritableSignal, signal } from '@angular/core';
import { Jugador } from 'src/app/interfaces/jugador';
import { SqliteService } from '../sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  // private jugadores: Jugador[] = [];
  private jugadores: WritableSignal<Jugador[]> = signal<Jugador[]>([]);

  constructor(private sqliteService: SqliteService) { }

  // async addJugador(nombre: string) {
  //   const db = this.sqliteService.getDatabaseConnection();
  //   if(db) {
  //     const query = `INSERT INTO jugadores (nombre_jugador) VALUES (?)`;
  //     await db.run(query, [nombre]);
  //     console.log('Jugador añadido');
  //   }
  // }

  async loadJugadores() {
    const db = this.sqliteService.getDatabaseConnection();
    const jugadores = await db.query('SELECT * FROM jugadores;');
    this.jugadores.set(jugadores.values || []);
  }

  async addJugador(nombre: string) {
    const db = this.sqliteService.getDatabaseConnection();
    // if(db) {
      const query = `INSERT INTO jugadores (nombre_jugador) VALUES ('${nombre}')`;
      const result = await db.query(query);

      this.loadJugadores();
      console.log('Jugador añadido');

      return result;
    // }
    // return false;
  }

  getJugadores() {
    return this.jugadores;
  }

  // async getJugadores(): Promise<{ id: number, nombre_jugador: string }[]> {
  //   try {
  //     const db = this.sqliteService.getDatabaseConnection();

  //     if (!db) {
  //       throw new Error('No hay conexión a la base de datos.');
  //     }

  //     const query = `SELECT * FROM jugadores`;
  //     const result = await db.query(query);

  //     if (result.values && result.values.length > 0) {
  //       return result.values as { id:number, nombre_jugador: string }[];
  //     } else {
  //       return [];
  //     } 
  //     } catch (error) {
  //       console.error('Error al obtener la lista de jugadores:', error);
  //       throw error;
  //   }
  // }

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
