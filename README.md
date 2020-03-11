## graphql-auth-implementation
# Authentication & Authorization with graphql

This repo provides a working implementation of a graphql service focusing on **authentication** and **authorization** using jwt.

We will be using the popular graphql tutorial that attempts to make a "hackernews" equivalent. Hackernews is a service that allows users to submit links (url, description) of interesting stuff on the internet.

Briefly speaking, our service will provide the following:
- feed: to list all the links that users have submitted
- link: to get a specific link
- post: to post a new link
- delete: to delete a link
- signup: :) 
- login: :)

## Lets get to work
> End goal: We will be creating two users with roles named "readonly" and "admin" respectively. And configuring proper authentication and authorization at the resolver level (akin to protecting resources).

Checkout my blog post for detailed step by step instructions

## Code structure
```
src:
    index.js: main entry point where the express server is started and the graphql resolvers are written
    auth.js: a util module to help with authentication and authorization
    schema.grahpql: our schema
fakedb:
    fakedb.js: exposes a fake in memory db and operations like select, insert etc. on it
```

## Running this app as is
```
git clone <URL>
cd graphql-auth-implementation
node src/index.js
```


## Sample graphql query that one can execute on the playground 
Go to http://localhost:4000 to open the playground.
```
query q_info {
  info
}

query q_me {
  me
}

query q_feed {
  feed {
    id
    description
    url
    user {
      id
      username
      password
      links {
        id
      }
    }
  }
}

query q_link {
  link(id: "link-1") {
    id
    description
    url
    user {
      username
    }
  }
}

mutation m_post {
  post(url: "yahoo.com", description: "really?") {
    id
  }
}

mutation m_delete {
  delete(id: "link-2") {
    id
    description
    url
  }
}

query q_login {
  login(username: "user-1", password: "password") {
    token
  }
}

```