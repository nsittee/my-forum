import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

export const schemas = loadSchemaSync(
    'src/graphql/typedefs/**/*.graphql',
    {
        loaders: [
            new GraphQLFileLoader()
        ]
    }
)
