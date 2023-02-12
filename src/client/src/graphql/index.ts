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
    query ($subName: String) {
      sub(subName: $subName) {
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
    query ($subName: String) {
      sub(subName: $subName) {
        _id
        SubThread {
          _id
          Upvote
          Downvote
          CreatedDate
          SubParent {
            _id
            SubLongName
            SubLongName
          }
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