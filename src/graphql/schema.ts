import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

export const initGraphqlSchema = () => {
    const schema = loadSchemaSync('src/graphql/typedefs/**/*.graphql', {
        loaders: [
            new GraphQLFileLoader()
        ]
    })

    return schema
}
