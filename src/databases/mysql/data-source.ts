import { DataSource } from 'typeorm';
import { User } from '../../components/users/entities/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'https://godbapps.com',
  port: 3306,
  username: 'finfine',
  password: 'Tlv@2024',
  database: 'fin_fine',
  synchronize: true, // TODO:: remove for production
  logging: false,
  entities: [User],
  migrations: ['src/databases/mysql/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
