import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    users: [String!]!
  }

  type Mutation {
    CreateUser(name: String!): String!
  }
`;

const users: string[] = [];

const resolvers = {
    Query: {
      users: () => { 
        return users;
      }
    },
    Mutation: {
      CreateUser: (parent: any, args: any, ctx: any) => {
        users.push(args.name);
        return `Usuário ${args.name} criado com sucesso!`;
      }
    }
}



const server = new ApolloServer({
  typeDefs,
  resolvers 
});

server.listen().then(({ url }) => {
  console.log('Server running at', url);
});
