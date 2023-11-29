import {ApolloServer} from 'apollo-server';
import {buildSchema} from 'type-graphql';
import { NoteResolver } from './resolvers/note.resolver';
import { dataSource }  from './config/db'
import "reflect-metadata"
import { UserResolver } from './resolvers/user.resolver';

const port: number = 3000;

const start = async () => {    

    const schema = await buildSchema({
        resolvers: [NoteResolver, UserResolver],
        validate: { forbidUnknownValues: false}
    })

    const server = new ApolloServer({
        schema,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            // const user = decode.jwt()
        }
    })

    try {
        await dataSource.initialize()        
        const { url } = await server.listen({ port });

        
        console.log('Server listening on port ' + url);
        
    } catch (error) {
        console.error("Error starting from the server: " + error);
    }
}

void start();