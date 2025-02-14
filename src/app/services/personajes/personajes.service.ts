import { Injectable, WritableSignal, signal } from '@angular/core';
import { SqliteService } from '../sqlite.service';
import { Personaje } from 'src/app/interfaces/personaje';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  private personajes: WritableSignal<Personaje[]> = signal<Personaje[]>([]);

  constructor(private sqliteservice: SqliteService) { }

  // async crearPersonaje(nombre: string, retrato: string, foto: string, idJugador: number | null){
  //   const db = this.sqliteservice.getDatabaseConnection();
  //   if (db) {
  //     try {
  //       const query = `INSERT INTO personajes (nombre, retrato, foto, seleccionado, id_jugador)
  //                       VALUES (?, ?, ?, ?, ?)`;
  //       await db.run(query, [nombre, retrato, foto, 0, idJugador]);
  //       console.log('Personaje ', nombre ,' creado con exito');
  //     } catch (error) {
  //       console.error('Error al crear el personaje:', error);
  //       throw error;
  //     }
  //   }
  // }

  async loadJugadores() {
    const db = this.sqliteservice.getDatabaseConnection();
    const personajes = await db.query('SELECT * FROM personajes;');
    this.personajes.set(personajes.values || []);
  }

  async reiniciarPersonajes() {
    const db = this.sqliteservice.getDatabaseConnection();
    if (db) {
      const query = `
      INSERT INTO personajes (nombre, retrato, foto, seleccionado, id_Jugador) VALUES
      ('Anush Faris', 'assets/retratos/Anush_Faris.png', 'assets/fotos/Anush.png', 0, null),
      ('Daria Samira', 'assets/retratos/Daria_Samira.png', 'assets/fotos/Daria.png', 0, null),
      ('Elmira Falak', 'assets/retratos/Elmira_Falak.png', 'assets/fotos/Elmira.png', 0, null),
      ('Kamran Soroush', 'assets/retratos/Kamran_Soroush.png', 'assets/fotos/Kamran.png', 0, null),
      ('Kavan Arash', 'assets/retratos/Kavan_Arash.png', '', 0, null),
      ('Mahdi Kaveh', 'assets/retratos/Mahdi_Kaveh.png', '', 0, null),
      ('Nahid Minoo', 'assets/retratos/Nahid_Minoo.png', '', 0, null),
      ('Renad Alkifa', 'assets/retratos/Renad_Alkifa.png', '', 0, null),
      ('Tarsa Yasmin', 'assets/retratos/Tarsa_Yasmin.png', '', 0, null),
      ('Xander Vasilios', 'assets/retratos/Xander_Vasilios.png', '', 0, null);
      `;
      try {
        await db.execute(query);
        this.loadJugadores();
        console.log('Personajes insertados.');
      } catch (error) {
        console.error('Error al reiniciar los personajes:', error);
        throw error;
      }
    } else {
      console.error('Ayuyu');
    }
  }

  async seleccionarPersonaje(jugadorId: number, personajeNombre: string) {
    const db = this.sqliteservice.getDatabaseConnection();
    if (db) {
      try {
        const query = `
        UPDATE personajes
        SET id_jugador = ?, seleccionado = 1
        WHERE nombre = ?;
        `;
        await db.run(query, [jugadorId, personajeNombre]);
      } catch (error) {
        console.error('Error al asignar el personaje al jugador:', error);
        throw error;
      }
    }
  }

  getPersonajes(): Personaje[] {
    return this.personajes();
  }

  // async getPersonajes(): Promise<{
  //   id: number,
  //   nombre: string,
  //   retrato: string,
  //   foto: string,
  //   seleccionado: boolean,
  //   idJugador: number
  // }[]> {
  //   try {
  //     const db = this.sqliteservice.getDatabaseConnection();

  //     if (!db) {
  //       throw new Error('No hay conexión a la base de datos.');
  //     }

  //     const query = `SELECT * FROM personajes`;
  //     const result = await db.query(query);

  //     if (!result.values || result.values.length === 0) {
  //       return [];
  //     }

  //     return result.values as { 
  //           id: number, 
  //           nombre: string,
  //           retrato: string,
  //           foto: string,
  //           seleccionado: boolean,
  //           idJugador: number  
  //         }[];
  //     // if (result.values && result.values.length > 0) {
  //     //   return result.values as { 
  //     //     id: number, 
  //     //     nombre: string,
  //     //     retrato: string,
  //     //     foto: string,
  //     //     seleccionado: boolean,
  //     //     idJugador: number  
  //     //   }[];
  //     // } else {
  //     //   return [];
  //     // } 
  //     } catch (error) {
  //       console.error('Error al obtener la lista de personajes:', error);
  //       throw error;
  //   }
  // }

  async getPersonajePorID(id: number) {
    const db = this.sqliteservice.getDatabaseConnection();

    if (!db) {
      throw new Error('No hay conexión a la base de datos.');
    }

    const query = `
    SELECT * FROM personajes
    WHERE id = ?
    `;
    try {
      const result = await db.query(query, [id]);
      if (result && result.values && result.values.length > 0) {
        return result.values[0];
      } else {
        console.log('No se encontró el personaje con ID: ', id);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el personaje:', error);
      return null;
    }
  }
}
