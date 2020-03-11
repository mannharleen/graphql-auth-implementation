const assert = require('assert')

db = {
    users: {
        "user-0": {
            id: "user-0",
            username: "readonyuser",
            password: "password",
            role: "role-1"
        },
        "user-1": {
            id: "user-1",
            username: "adminuser",
            password: "password",
            role: "role-2"
        }
    },
    links: {
        "link-1": {
            id: "link-1",
            description: "the search engine",
            url: "https://www.google.com"
    
        }
    },
    // roles are used to for RBAC to resources by defining scopes
    roles: {
        "role-1": {
            id: "role-1",
            name: "readonlyrole",
            scopes: ["info", "feed", "link", "me"]
        },
        "role-2": {
            id: "role-2",
            name: "adminrole",
            scopes: ["info", "feed", "link", "me", "post", "delete"]
        }
    }
}

globalId = 2

selectOp = (table, id) => {
    if (id == null) {
        return Object.values(db[table])
    }
    return db[table][id]
}

insertOp = (table, data) => {    
    let toReturn
    if (table == "users") {
        newId = 'user' +'-'+ globalId
        assert (data.username)
        assert (data.password)
        toReturn = {
            id: newId,
            username: data.username,
            password: data.password
        }
        db[table][newId] = toReturn
        
    } else if (table == "links") {
        newId = 'link' +'-'+ globalId
        assert (data.description)
        assert (data.url)   
        toReturn =  {
            id: newId,
            description: data.description,
            url: data.url
        }
        db[table][newId] = toReturn
    }
    globalId++
    return toReturn
}

deleteOp = (table, data) => {
    let toReturn = db[table][data.id]
    delete db[table][data.id]
    return toReturn
}


module.exports = {    
    selectOp: selectOp,
    insertOp: insertOp,
    deleteOp: deleteOp,
}