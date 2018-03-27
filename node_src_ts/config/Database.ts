import * as mongoose from 'mongoose';
import { connect, Connection, Mongoose } from 'mongoose';
import { coreConfig } from './keys';
import { MongoError } from 'mongodb';

export class Database {
  public mongooseConnection: Connection;

  constructor() {
    (mongoose as Mongoose).Promise = global.Promise;
  }

  public connectDatabase() {
    connect(coreConfig.mongoDB.URI)
      .then(() => {
        this.mongooseConnection = mongoose.connection;
        Database.onMongoConnection();
      })
      .catch((error: MongoError) => {
        Database.onMongoConnectionError(error);
      });
  }

  private static onMongoConnection() {
    // Can be used to log more information, use other logger package
    console.log('Mongo connected');
  }

  private static onMongoConnectionError(error: MongoError) {
    console.log(`Error connecting to database:  ${error}`);
  }
}
