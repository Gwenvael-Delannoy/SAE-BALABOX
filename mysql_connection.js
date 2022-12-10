const mysql = require('mysql');

/**
 * MYSQL connection
 */
class mysql_connection{

    
    /**
     * Initialize and create the connection to the database
     */
    constructor(){
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'balabox', // nom de l'utilisateur de la base de donnee (a modifier si necessaire)
            password: 'balabox' // mot de passe de l'utilisateur de la base de donnee (a modifier si necessaire)
        });

        this.connection.connect(function(err) {
            if (err) throw err;
            else console.log("Connecter a la bas de donnee");
        });
    }

    /**
     * getter of the connection to the database
     * @returns {mysql_connection} connection to the database
     */
    getConnection(){
        return this.connection;
    }
    

}

var db = new mysql_connection();
module.exports = db.getConnection();