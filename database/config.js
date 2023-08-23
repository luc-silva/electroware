db = db.getSiblingDB('project_electroware');

db.createUser({
    user: "user",
    pwd: "pass",
    roles: [ { role: "readWrite", db: "project_electroware"} ],
    passwordDigestor: "server",
})