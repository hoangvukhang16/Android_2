const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const authMiddleware = require('./authMiddleware');
const authenticateToken = require('./authenticateToken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:8081' }));
app.use(bodyParser.json());

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
};

// Cart Router
const cartRouter = express.Router();

// API to get the list of products
app.get('/api/products', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// API to get the list of categories
app.get('/api/category', (req, res) => {
    db.query('SELECT * FROM category', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// API to get products by category
app.get('/api/products/category/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    db.query('SELECT * FROM products WHERE category_id = ?', [categoryId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// API to add a new user
app.post('/api/users', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err.message });
        const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });
        db.query('INSERT INTO users (name, email, password, token) VALUES (?, ?, ?, ?)', [name, email, hash, token], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: results.insertId, name, email, token });
        });
    });
});

// API to process login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });
            const token = jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' });
            db.query('UPDATE users SET token = ? WHERE id = ?', [token, user.id], (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ id: user.id, name: user.name, email: user.email, token });
            });
        });
    });
});

// Route to add product to the cart
cartRouter.post('/', (req, res) => {
    const { productId, quantity, userId } = req.body;
    if (!productId || !quantity || !userId) {
        return res.status(400).json({ message: 'Product ID, quantity, and user ID are required.' });
    }
    db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [userId, productId, quantity], (err, results) => {
        if (err) return res.status(500).json({ message: 'Internal Server Error', error: err.message });
        res.status(201).json({ message: 'Product added to cart', cartItemId: results.insertId });
    });
});

// API to get cart items for a user
cartRouter.get('/:userId', (req, res) => {
    const { userId } = req.params;
    db.query('SELECT * FROM cart INNER JOIN products ON cart.product_id = products.id WHERE cart.user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// API to remove product from the cart
cartRouter.post('/remove', (req, res) => {
    const { userId, productId } = req.body;
    db.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Connecting cartRouter to express app
app.use('/api/cart', cartRouter);

// API to process payment information
app.post('/api/payment', (req, res) => {
    const { userId, amount } = req.body;
    db.query('INSERT INTO payments (user_id, amount) VALUES (?, ?)', [userId, amount], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, userId, amount });
    });
});

// API to update user password
app.put('/api/users/password', async (req, res) => {
    const { password } = req.body;
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, userResults) => {
            if (err) return res.status(500).json({ message: 'User not found' });

            const user = userResults[0];
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) return res.status(500).json({ message: 'Error hashing password' });

                db.query('UPDATE users SET password = ? WHERE id = ?', [hash, user.id], (err) => {
                    if (err) return res.status(500).json({ message: 'Error updating password' });
                    res.status(200).json({ message: 'Password updated successfully' });
                });
            });
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update password' });
    }
});

// API to fetch user data
app.get('/api/users/:id', authenticateToken, (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});

// API to create order
app.post('/api/orders', (req, res) => {
    const { user_id, total_amount, payment_method, payment_details } = req.body;

    const query = 'INSERT INTO orders (user_id, total_amount, payment_method, payment_details) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, total_amount, payment_method, JSON.stringify(payment_details)], (err, result) => {
        if (err) {
            console.error('Error creating order:', err);
            return res.status(500).json({ status: 'error', message: 'An error occurred' });
        }

        const orderId = result.insertId;
        return res.json({ status: 'success', orderId });
    });
});

// API to create order items
app.post('/api/order_items', (req, res) => {
    const orderItems = req.body;

    const query = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
    const values = orderItems.map(item => [item.order_id, item.product_id, item.quantity, item.price]);

    db.query(query, [values], (err, result) => {
        if (err) {
            console.error('Error creating order items:', err);
            return res.status(500).json({ status: 'error', message: 'An error occurred while creating order items.' });
        }

        return res.json({ status: 'success', message: 'Items successfully added to the order.' });
    });
});

// API to get user profile
app.get('/api/profile', (req, res) => {
    const userId = req.query.id;
    const query = 'SELECT id, name, email FROM users WHERE id = ?';

    db.query(query, [userId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(result[0]);
    });
});
// API để thay đổi mật khẩu người dùng
app.post('/api/change-password', async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    // Kiểm tra xem tất cả các trường có được cung cấp không
    if (!userId || !oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Tất cả các trường là bắt buộc' });
    }

    // Tìm người dùng trong cơ sở dữ liệu
    db.query('SELECT * FROM users WHERE id = ?', [userId], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Lỗi server' });
        }

        const user = results[0];
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }

        // Kiểm tra mật khẩu cũ
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu cũ không đúng' });
        }

        // Kiểm tra mật khẩu mới có hợp lệ không
        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'Mật khẩu mới phải có ít nhất 6 ký tự' });
        }

        // Mã hóa mật khẩu mới và cập nhật trong cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, user.id], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Lỗi khi cập nhật mật khẩu' });
            }
            res.status(200).json({ message: 'Mật khẩu đã được cập nhật thành công' });
        });
    });
});
// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
