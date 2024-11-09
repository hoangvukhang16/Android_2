// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // thay đổi nếu cần
    password: '', // mật khẩu MySQL
    database: 'android' // tên cơ sở dữ liệu
});

db.connect((err) => {
    if (err) {
        console.error('Kết nối tới MySQL thất bại:', err);
        return;
    }
    console.log('Kết nối tới MySQL thành công!');
});

module.exports = db;
