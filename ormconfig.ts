// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './src/db/entities/User.Entity';
import { LoginCounter } from './src/db/entities/LoginCounter.Entity';

// export const connectionSource = new DataSource({
//   type: 'postgres',
//   migrationsTableName: 'migrations',
//   name: 'default',
//   synchronize: false,
//   logging: true,
//   entities: ['src/db/entities/**.ts'],
//   // /src/db/entities/User.Entity.ts
//   url: process.env.DB_URL,
//   migrations: ['src/db/migrations/'],
// });

// export const dataSourceProvider = {
//   provide: 'DataSource',
//   useFactory: connectionSource,
// };

// module.exports = {
// type: 'postgres',
// migrationsTableName: 'migrations',
// name: 'default',
// synchronize: false,
// logging: true,
// entities: ['src/db/entities/entities/**.Entity.ts'],
// // /src/db/entities/User.Entity.ts
// url: process.env.DB_URL,
// migrations: ['src/db/migrations/'],
// };

export const connectionSource: TypeOrmModuleOptions = {
  type: 'postgres',
  migrationsTableName: 'migrations',
  name: 'default',
  synchronize: true,
  logging: true,
  entities: [User, LoginCounter],
  // /src/db/entities/User.Entity.ts
  url: process.env.DB_URL,
  migrations: ['src/db/migrations/'],
};
