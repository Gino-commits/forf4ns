import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'

const config = {
    host: 'localhost',
    user: 'root',
    password: 'insertesucontraseña',
    database: 'forf4ns'
}

const connection = await mysql.createConnection(config)

export class userModel{
    static async register({ userName, password, usertype }){
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            await connection.query('INSERT INTO Users (userName, password, usertype) VALUES (?, ?, ?);', [userName, hashedPassword, usertype]);
            return true;
        } catch{
            return false;
        }
    }

    static async validateLogin({ userName, password }){
        const [result] = await connection.query('SELECT password FROM Users WHERE username = ?;', [userName])
        if(result.length === 0){
            return false
        }

        const passwordIsCorrect = await bcrypt.compare(password, result[0].password)
        return passwordIsCorrect
    }

    static async getUsertype({ userName }){
        const [result] = await connection.query('SELECT usertype FROM Users WHERE username = ?;', [userName])

        return { usertype: result[0].usertype }
    }
}