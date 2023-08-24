db = db.getSiblingDB("project_electroware");

db.createUser({
    user: "user",
    pwd: "pass",
    roles: [{ role: "readWrite", db: "project_electroware" }],
    passwordDigestor: "server",
});

rs.initiate({
    _id: "mongo-cluster",
    members: [
        { _id: 0, host: "mongodb1:27017" },
        { _id: 1, host: "mongodb2:27018" }, 
    ],
});

// rs.initiate({ _id: "mongo-cluster", members: [ { _id: 0, host: "mongodb1" }, { _id: 1, host: "mongodb2" }] });