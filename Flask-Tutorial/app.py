from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

# adding configuration for using a sqlite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:sibansu@127.0.0.1:3306/abi_practice'

# Creating an SQLAlchemy instance
db = SQLAlchemy(app)

class User_one(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255))

# Sample route for testing
@app.route('/users', methods=['GET'])
def get_users():
    users = User_one.query.all()
    
    user_list = []
    for user in users:
        user_dict = {'id': user.id, 'username': user.username, 'email': user.email}
        user_list.append(user_dict)

    return jsonify({'users': user_list})

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()

    if 'username' in data and 'email' in data:
        new_user = User_one(username=data['username'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User added successfully'})
    else:
        return jsonify({'error': 'Invalid request. Please provide username and email in the request body'}), 400

@app.route('/delete_user/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user_to_delete = User_one.query.filter_by(id=user_id).first()

    if user_to_delete:
        db.session.delete(user_to_delete)
        db.session.commit()
        return jsonify({'message': f'User with id {user_id} deleted successfully'})
    else:
        return jsonify({'error': 'User not found'}), 404

if __name__ == '__main__':
	app.run()
