const mysql = require('mysql2');
const bcrypt = require('bcryptjs'); 

const pool = mysql.createPool({
    host: 'mysql-2cf80933-atharvambulkar2003-f84c.g.aivencloud.com',
    user: 'avnadmin',
    password: 'AVNS_4SAYBgqLuLZUJpBxLp8',
    database: 'defaultdb',
    port: 15505,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        rejectUnauthorized: false
    }
}).promise();

const verifyAdmin = async(username,password) => {
    try {
        const query = "select * from employee where username = ?";
        const [rows] = await pool.query(query,[username]);
        if(rows.length>0){
            const user = rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return { success: true, user: user };
            } else {
                return { success: false, message: "Invalid Password" };
            }

        }else{
            return {success:false,message:"User Not Fount"};
        }
    } catch (errer) {
        throw errer;
    }
} 

const findAllEmployee = async() => {
    try {
        const [rows] = await pool.query("select * from employee");
        if(rows.length>0){
            return {success:true, users:rows}
        }else{
            return {success:false,messsage:"No Employee yet in db"}
        }
    } catch (error) {
        throw error;
    }
}

const deleteEmployeeById = async (empid) => {
    try {
        const query = "delete from employee where id = ?";
        const [rows] = await pool.query(query,[empid]);

        if (rows.affectedRows > 0) {
            return { success: true, message: "Employee deleted successfully" };
        } else {
            return { success: false, message: "Employee not found in database" };
        }
    } catch (error) {
        throw error;
    }
}

const updateEmployeeProfile = async (id, name, email) => {
    try {
        const query = "update employee set name = ?, email = ? where id = ?";
        const [result] = await pool.query(query, [name, email, id]);
        if (result.affectedRows > 0) {
            return { success: true, message: "Profile updated successfully" };
        } else {
            return { success: false, message: "No changes were made or user not found" };
        }
    } catch (error) {
        throw error; 
    }
}

module.exports = {verifyAdmin,findAllEmployee,deleteEmployeeById,updateEmployeeProfile};