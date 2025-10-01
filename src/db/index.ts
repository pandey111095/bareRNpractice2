import { Platform } from 'react-native';
import SQLite, { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';

SQLite.enablePromise(true);

const DB_NAME = 'bareapp2.app.db';

const migrations = [
  {
    version: 1,
    scriptFiles: ['1758873906_create_versions_tables.sql'],
  },
  {
    version: 2,
    scriptFiles: ['1758874517_create_users_table.sql', '1758874561_create_goals_tables.sql'],
  },
  {
    version: 3,
    scriptFiles: ['1758875014_create_accounts_tables.sql'],
  }
  
  // Add more versions here...
];

export async function getDB(): Promise<SQLiteDatabase> {
  const db = await SQLite.openDatabase({ name: DB_NAME, location: 'default' });
  await db.executeSql('PRAGMA foreign_keys = ON;');
  return db;
}

export async function runMigrations(): Promise<SQLiteDatabase> {
  const db = await getDB();

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS versions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      schema_version INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const [res]: [ResultSet] = await db.executeSql(
    'SELECT MAX(schema_version) as version FROM versions'
  );
  const currentVersion =
    res.rows.item(0)?.version != null ? res.rows.item(0).version : 0;

  console.log(`📌 Current DB version: ${currentVersion}`);

  const pendingMigrations = migrations.filter(m => m.version > currentVersion);

  for (const migration of pendingMigrations) {
    console.log(`⚡ Running migration v${migration.version}`);

    for (const file of migration.scriptFiles) {
      const sql = await readSqlFile(file);

      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(Boolean);

      for (const stmt of statements) {
        await db.executeSql(stmt);
      }
      console.log(`✅ Applied ${file}`);
    }

    await db.executeSql(
      'INSERT INTO versions (schema_version) VALUES (?)',
      [migration.version]
    );
  }

  console.log('🚀 All migrations applied');
  return db;
}

async function readSqlFile(fileName: string): Promise<string> {
  if (Platform.OS === 'ios') {
    const path = `${RNFS.MainBundlePath}/migrations/${fileName}`;
    console.log('iOS Bundle Path: ', RNFS.MainBundlePath);
    return RNFS.readFile(path, 'utf8');
  } else {
    return RNFS.readFileAssets(`migrations/${fileName}`, 'utf8');
  }
}
