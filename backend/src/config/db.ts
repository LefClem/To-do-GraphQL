import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  username: "root",
  password: "Klapaucius972!",
  database: "Note",
  entities: ["src/entities/*.ts"],
  synchronize: false,
  logging: true,
});
