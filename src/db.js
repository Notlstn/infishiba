import Dexie from "dexie";
let db = new Dexie(process.env.REACT_APP_DATABASE_NAME);
db.version(1).stores({
    users: "++id,login,password",
    featuredShibas: "++id,belongs,image_url,[belongs+image_url]"
});
db.open();

export default db;
