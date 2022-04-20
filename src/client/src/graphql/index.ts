export const graphQlQueries = {
  getUser: `
    query {
      user {
        _id
        Username
        UpvoteThread {
          _id
        }
        DownvoteThread {
          _id
        }
        UserSub {
          _id
        }
        UserThread {
          _id
        }
      }
    }
  `,
  getAllThreads: `
    query threads ($subName: String) {
      threads(subName: $subName) {
        _id
        SubThread {
          _id
          Upvote
          Downvote
          CreatedDate
          ThreadComment {
            _id
          }
          Author {
            _id
            Username
          }
          Title
          Content
          vote
        }
      }
    } 
  `,
  getAllThreadsAndUser: `
    query threads ($subName: String) {
      threads(subName: $subName) {
        _id
        SubThread {
          _id
          Upvote
          Downvote
          CreatedDate
          ThreadComment {
            _id
          }
          Author {
            _id
            Username
          }
          Title
          Content
          vote
        }
      }
      user {
        _id
        Username
        UpvoteThread {
          _id
        }
        DownvoteThread {
          _id
        }
        UserSub {
          _id
        }
        UserThread {
          _id
        }
      }
    }
  `,
  getOneThread: ``,
}