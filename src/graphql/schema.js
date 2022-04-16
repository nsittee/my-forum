const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        threads: [Thread]
        thread(id: String): Thread
    }
    type User {
        _id: String
        Username: String
        Password: String
        UpvoteThread: [Thread]
        DownvoteThread: [Thread]
        UserThread: [Thread]
        UserSub: [Sub]
    }
    type Sub {
        _id: String,
        SubLongName: String,
        SubShortName: String,
        SubUser: [User],
        SubThread: [Thread],
    }
    type Thread {
        _id: String,
        Title: String,
        Content: String,
        Upvote: Int,
        Downvote: Int,
        CreatedDate: String,
        Author: User,
        ThreadComment: [Comment],
        SubParent: Sub,
        vote: String,
    }
    type Comment {
        _id: String,
        Content: String,
        Commenter: User,
    }
`);

module.exports = schema;