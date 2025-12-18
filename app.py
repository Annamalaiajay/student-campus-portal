from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
import sqlite3
from datetime import datetime, date

app = Flask(__name__)
app.secret_key = 'campus-secret-key-2024'

def init_db():
    conn = sqlite3.connect('campus.db')
    c = conn.cursor()
    
    c.execute('''CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'student'
    )''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS attendance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        date DATE,
        time TIME,
        verification_type TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS complaints (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        category TEXT,
        description TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )''')
    
    conn.commit()
    conn.close()

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        conn = sqlite3.connect('campus.db')
        c = conn.cursor()
        c.execute('SELECT * FROM users WHERE username = ?', (username,))
        user = c.fetchone()
        conn.close()
        
        if user and check_password_hash(user[3], password):
            session['user_id'] = user[0]
            session['username'] = user[1]
            session['role'] = user[4]
            
            return redirect(url_for('admin_dashboard' if user[4] == 'admin' else 'student_dashboard'))
        else:
            flash('Invalid credentials')
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']
        role = request.form.get('role', 'student')
        
        hashed_password = generate_password_hash(password)
        
        conn = sqlite3.connect('campus.db')
        c = conn.cursor()
        try:
            c.execute('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
                     (username, email, hashed_password, role))
            conn.commit()
            flash('Registration successful')
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            flash('Username or email already exists')
        finally:
            conn.close()
    
    return render_template('register.html')

@app.route('/student_dashboard')
def student_dashboard():
    if 'user_id' not in session or session['role'] != 'student':
        return redirect(url_for('login'))
    return render_template('student_dashboard.html')

@app.route('/admin_dashboard')
def admin_dashboard():
    if 'user_id' not in session or session['role'] != 'admin':
        return redirect(url_for('login'))
    return render_template('admin_dashboard.html')

@app.route('/attendance')
def attendance():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    conn = sqlite3.connect('campus.db')
    c = conn.cursor()
    
    if session['role'] == 'admin':
        c.execute('''SELECT a.*, u.username FROM attendance a 
                     JOIN users u ON a.user_id = u.id ORDER BY a.date DESC''')
    else:
        c.execute('SELECT * FROM attendance WHERE user_id = ? ORDER BY date DESC', 
                 (session['user_id'],))
    
    records = c.fetchall()
    conn.close()
    
    return render_template('attendance.html', records=records)

@app.route('/mark_attendance', methods=['POST'])
def mark_attendance():
    if 'user_id' not in session or session['role'] != 'student':
        return redirect(url_for('login'))
    
    verification_type = request.form['verification_type']
    today = date.today()
    
    conn = sqlite3.connect('campus.db')
    c = conn.cursor()
    
    c.execute('SELECT * FROM attendance WHERE user_id = ? AND date = ?', 
             (session['user_id'], today))
    if c.fetchone():
        flash('Attendance already marked today')
    else:
        c.execute('INSERT INTO attendance (user_id, date, time, verification_type) VALUES (?, ?, ?, ?)',
                 (session['user_id'], today, datetime.now().time(), verification_type))
        conn.commit()
        flash('Attendance marked successfully')
    
    conn.close()
    return redirect(url_for('attendance'))

@app.route('/complaints')
def complaints():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    conn = sqlite3.connect('campus.db')
    c = conn.cursor()
    
    if session['role'] == 'admin':
        c.execute('''SELECT c.*, u.username FROM complaints c 
                     JOIN users u ON c.user_id = u.id ORDER BY c.created_at DESC''')
    else:
        c.execute('SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC', 
                 (session['user_id'],))
    
    complaints = c.fetchall()
    conn.close()
    
    return render_template('complaints.html', complaints=complaints)

@app.route('/submit_complaint', methods=['POST'])
def submit_complaint():
    if 'user_id' not in session or session['role'] != 'student':
        return redirect(url_for('login'))
    
    category = request.form['category']
    description = request.form['description']
    
    conn = sqlite3.connect('campus.db')
    c = conn.cursor()
    c.execute('INSERT INTO complaints (user_id, category, description) VALUES (?, ?, ?)',
             (session['user_id'], category, description))
    conn.commit()
    conn.close()
    
    flash('Complaint submitted successfully')
    return redirect(url_for('complaints'))

@app.route('/network')
def network():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    conn = sqlite3.connect('campus.db')
    c = conn.cursor()
    
    c.execute('''SELECT p.*, u.username FROM posts p 
                 JOIN users u ON p.user_id = u.id 
                 ORDER BY p.created_at DESC''')
    posts = c.fetchall()
    
    c.execute('SELECT id, username FROM users WHERE role = "student" AND id != ?', 
             (session['user_id'],))
    students = c.fetchall()
    
    conn.close()
    
    return render_template('network.html', posts=posts, students=students)

@app.route('/create_post', methods=['POST'])
def create_post():
    if 'user_id' not in session or session['role'] != 'student':
        return redirect(url_for('login'))
    
    content = request.form['content']
    
    conn = sqlite3.connect('campus.db')
    c = conn.cursor()
    c.execute('INSERT INTO posts (user_id, content) VALUES (?, ?)',
             (session['user_id'], content))
    conn.commit()
    conn.close()
    
    flash('Post created successfully')
    return redirect(url_for('network'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)