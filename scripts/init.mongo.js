#!/usr/bin/mongo

let db = new Mongo().getDB("bugsdb");

db.bugs.remove({});

db.bugs.insert([
  {priority: 'Low', status:'Open', owner:'Ravan', title:'App crashes on open', description:'Hello'},
  {priority: 'Medium', status:'New', owner:'Eddie', title:'Misaligned border on panel', description:'Hello'}
]);

