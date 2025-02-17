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

        const crearTablaPartidaEnCurso = `CREATE TABLE IF NOT EXISTS partida (
          id INTEGER PRIMARY KEY,
          enCurso BOOLEAN DEFAULT 0
        );`;
        await this.db.execute(crearTablaPartidaEnCurso);

        const result = await this.db.query(`SELECT COUNT(*) as count FROM partida;`);

        if (result.values && result.values.length > 0 && result.values[0].count === 0) {
          await this.db.execute(`INSERT INTO partida (enCurso) VALUES (0);`);
          console.log('Se ha insertado una fila inicial en la tabla partida.');
        }

      } catch (error) {
        console.error('Error al conectar a la base de datos:')
      }
  }

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
        id_jugador INTEGER,
        FOREIGN KEY (id_jugador)  REFERENCES jugadores(id) ON DELETE CASCADE
      );`;

      // if(this.db) {
        await this.db.execute(crearTablaJugadores);
        await this.db.execute(crearTablaPersonajes);
        console.log('Tablas de jugadores y personajes creadas con correctamente');
      // }
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

  async guardarDatos() {
    try {
      await this.db.run("COMMIT;")
      console.log("Base de datos guardada en almacenamiento permanente");
    } catch (error) {
      console.error("Error guardando en almacenamiento permanente:", error);
    }
  }

  closeConnection() {
    this.db.close();
  }
}

