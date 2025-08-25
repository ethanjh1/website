from flask import Flask, render_template, jsonify
import os
from datetime import datetime

app = Flask(__name__)

# Easter egg achievements
achievements = {
    'konami': False,
    'explorer': False,
    'clicker': False,
    'keyboard_master': False,
    'garden_keeper': False
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/achievements')
def get_achievements():
    return jsonify(achievements)

@app.route('/api/achievements/<achievement>', methods=['POST'])
def unlock_achievement(achievement):
    if achievement in achievements:
        achievements[achievement] = True
        return jsonify({'success': True, 'achievement': achievement})
    return jsonify({'success': False}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

