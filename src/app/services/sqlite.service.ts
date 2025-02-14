import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

const dbName = 'geonDB';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  constructor() { }

  async inicBD() {
    try {

      this.db = await this.sqlite.createConnection(
        dbName,
        false,
        'no-encryption',
        1,
        false
        );
        
        await this.db.open();
      } catch (error) {
        console.error('Error al conectar a la base de datos:')
      }
  }

  // async iniciarBD(): Promise<void> {
  //   try {
  //     console.log('Holi')
  //     // const connection: SQLiteDBConnection | null = await CapacitorSQLite.createConnection({
  //     this.db = await CapacitorSQLite.createConnection({
  //       database: dbName,
  //       version: 1,
  //       encrypted: false,
  //       mode: 'no-encrypted',
  //     }) as unknown as SQLiteDBConnection;

  //     if (!this.db) {
  //       throw new Error('No se pudo abrir la conexion a la base de datos.')
  //     }

  //     await this.db.open();
  //     console.log('Base de datos inicializada correctamente');
  //   } catch (error) {
  //     console.error('Error al inicializar la base de datos:', error);
  //   }
  // }

  // async iniciarBD() {
  //   try {

  //     const dbResult = await CapacitorSQLite.checkConnectionsConsistency({ dbNames: [this.dbName] });

  //     if (dbResult.result) {
  //       console.log('Conexión SQLite consistente.');
  //     } else {
  //       console.warn('Inconsistencia en la conexión SQLite.');
  //     }

  //     // Crear conexión
  //     await CapacitorSQLite.createConnection({
  //       database: this.dbName,
  //       version: 1,
  //       encrypted: false,
  //       mode: 'no-encrypted',
  //     });

  //     this.db = await CapacitorSQLite.retrieveConnection(this.dbName);

  //     if (!this.db) {
  //       throw new Error('No se pudo obtener la conexión a la base de datos.');
  //     }

  //     // Abrir la base de datos
  //     await this.db.open();
  //     console.log('Base de datos abierta correctamente.');
  //   } catch (error) {
  //     console.error('Error al inicializar la base de datos:', error);
  //     throw error;
  //   }
  // }

  // Método para obtener la conexión a la BD
  getDatabaseConnection(): SQLiteDBConnection {
    if (!this.db) {
      throw new Error('La base de datos no ha sido inicializada.');
    }
    return this.db;
  }


  private async createTables() {
      const crearTablaJugadores = `CREATE TABLE IF NOT EXISTS jugadores (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_jugador TEXT
      )`;

      const crearTablaPersonajes = `CREATE TABLE IF NOT EXISTS personajes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        retrato TEXT NOT NULL,
        foto TEXT NOT NULL,
        seleccionado BOOLEAN NOT NULL DEFAULT 0,
        id_jugador INTEGER UNIQUE,
        FOREIGN KEY (id_jugador)  REFERENCES jugadores(id) ON DELETE CASCADE
      );`;

      if(this.db) {
        await this.db.execute(crearTablaJugadores);
        await this.db.execute(crearTablaPersonajes);
        console.log('Tablas de jugadores y personajes creadas con correctamente');
      }
  }

  async resetearTablas() {
    try {
      if(this.db) {
        await this.db.execute('DROP TABLE IF EXISTS personajes');
        await this.db.execute('DROP TABLE IF EXISTS jugadores');
        console.log('Aqui llega');

        await this.createTables();
      } 
    } catch (error) {
      console.error('Error al resetear las tablas:', error);
    }
  }

  // getDatabaseConnection(): SQLiteDBConnection | null {
  //   return this.db;
  // }
}

