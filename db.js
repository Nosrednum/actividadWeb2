const MongoClient   = require("mongodb").MongoClient;

const settings={
    URL: 'mongodb://localhost:27017',
    name:'token',
    collection: 'users'
}

const client = new MongoClient(settings.URL, { useUnifiedTopology: true });

const getDb = (callback) => {
  client.connect(err => {
    if(!err)callback(client.db(settings.name), client);
    else console.log('Cannot connect to DB');
  });
};
exports.getDatabase = getDb;

const find = (db, callback) => {
  const collection = db.collection(settings.collection);
  collection.find({}).toArray((err, docs)=> {
      if(!err) callback(docs);
      else console.log('Cannot find documents');
    });
};
exports.findDocuments = find;

const findOne = (db, callback, username) => {
  const collection = db.collection(settings.collection);
  collection.findOne({ username: username }, (err, res) => {
    if(!err) callback(res);
    else console.log('User is not registered');
  });
};
exports.findUser      = findOne;

const insert = (db, user) => {
  const collection = db.collection(settings.collection);
  collection.insert(user);
};
exports.createUser = insert;