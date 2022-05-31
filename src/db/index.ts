import 'reflect-metadata';
import { UserAuth } from './enyity/userAuth';
import { User } from './enyity/users';
import { DataSource } from 'typeorm';
import { Article } from './enyity/article';
import { Comment } from './enyity/comment';
import { Category } from './enyity/category';

const username = process.env.DATABASE_USERNAME
const password = process.env.DATABASE_PASSWORD
const database = process.env.DATABASE_NAME
const host = process.env.DATABASE_HOST

const AppDataSource = new DataSource({
  type: "mysql",
  host: host,
  port: 3306,
  username,
  password,
  database,
  entities: [User, UserAuth, Article, Comment, Category],
  synchronize: false,
  logging: true,
})

const getInitializedDataSource = async () => {
  if (AppDataSource.isInitialized) {
    return AppDataSource
  }

  await AppDataSource.initialize()
  return AppDataSource
}

export default getInitializedDataSource
