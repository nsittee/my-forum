import { IxUser } from './../../model/user-model'

// Get currentUser value from context for graphQL
export const getUserFromContext = (context: any): IxUser => context.res.locals.currentUser
