const { GraphQLServer } = require("graphql-yoga")
// const {prisma} = require("./generated/prisma-client")
const db = require("../fakedb/fakedb")
const auth = require("./auth")

let resolvers = {
    Query: {
        info: () => "Welcome to hackernews-node-fakedb",
        feed: (_, args, context, info) => {
            // perform authorization
            auth.authorize(context.request.get('Authorization'), info.fieldName)
            return context.db.selectOp('links')
        },        
        link: (_, args, context, info) => {
            // perform authorization
            auth.authorize(context.request.get('Authorization'), info.fieldName)
            return context.db.selectOp('links', args.id)
        },
        login: (_, args, context) => {
            // perform authentication
            return auth.authenticate(args, context)
        },
        me: (_, args, context, info) => {
            // perform authorization
            auth.authorize(context.request.get('Authorization'), info.fieldName)
            decoded = auth.verifyJWT(context.request.get('Authorization').replace('Bearer ', ''))
            return decoded.sub
        }
    },
    Mutation: {
        post: (parent, args, context, info) => {
            // perform authorization            
            auth.authorize(context.request.get('Authorization'), info.fieldName)
            return context.db.insertOp('links', {
                url: args.url,
                description: args.description
            })
        },
        delete: (_, args, context, info) => {
            auth.authorize(context.request.get('Authorization'), info.fieldName)
            return context.db.deleteOp('links', {id: args.id})
        }
    },
}

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: resolvers,
    context: request => {return { ...request, db }} // { prisma }
})

server.start(() => console.log("started server at :4000"))