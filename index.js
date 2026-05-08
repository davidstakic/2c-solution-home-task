const { ApolloServer, gql } = require("apollo-server");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `);
});

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users(name: String, email: String): [User]
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    deleteUser(id: ID!): String
  }
`;

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
};

const resolvers = {
  Query: {
    users: (_, args) => {
      return new Promise((resolve, reject) => {
        let query = "SELECT * FROM users";

        const conditions = [];
        const values = [];

        if (args.name) {
          conditions.push("name = ?");
          values.push(args.name);
        }

        if (args.email) {
          conditions.push("email = ?");
          values.push(args.email);
        }

        if (conditions.length > 0) {
          query += " WHERE " + conditions.join(" AND ");
        }

        db.all(query, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    },
  },

  Mutation: {
    addUser: (_, { name, email }) => {
      return new Promise((resolve, reject) => {
        if (!validateEmail(email)) {
          reject(new Error("Invalid email address"));

          return;
        }

        db.run(
          "INSERT INTO users (name, email) VALUES (?, ?)",
          [name, email],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve({
                id: this.lastID,
                name,
                email,
              });
            }
          },
        );
      });
    },

    deleteUser: (_, { id }) => {
      return new Promise((resolve, reject) => {
        db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve("User deleted");
          }
        });
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
