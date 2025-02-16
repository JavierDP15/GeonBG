import { Injectable, WritableSignal, signal } from '@angular/core';
import { SqliteService } from '../sqlite.service';
import { Personaje } from 'src/app/interfaces/personaje';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  private personajes: WritableSignal<Personaje[]> = signal<Personaje[]>([]);

  constructor(private sqliteservice: SqliteService) { }

  async loadPersonajes() {
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
        this.loadPersonajes();
        console.log('Personajes insertados.');
      } catch (error) {
        console.error('Error al reiniciar los personajes:', error);
        throw error;
      }
    } else {
      console.error('Ayuyu');
    }
  }

  async seleccionarPersonaje(jugadorId: number, personajeId: number) {
    const db = this.sqliteservice.getDatabaseConnection();
    if (db) {
      try {
        const query = `
        UPDATE personajes
        SET id_jugador = ?, seleccionado = 1
        WHERE id = ?;
        `;
        await db.run(query, [jugadorId, personajeId]);
        await this.loadPersonajes();
        console.log('Personaje seleccionado para el jugador', jugadorId);
      } catch (error) {
        console.error('Error al asignar el personaje al jugador:', error);
        throw error;
      }
    }
  }

  getPersonajes(): Personaje[] {
    return this.personajes();
  }

  async getPersonajePorID(id: number): Promise<Personaje | null> {
    const db = this.sqliteservice.getDatabaseConnection();

    if (!db) {
      throw new Error('No hay conexión a la base de datos.');
    }

    try {
      const query = `
      SELECT * FROM personajes
      WHERE id = ?
      `;
      const result = await db.query(query, [id]);
      if (result && result.values && result.values.length > 0) {
        return result.values[0] as Personaje;
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
