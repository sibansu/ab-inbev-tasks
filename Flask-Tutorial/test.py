from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import uuid
from flask_cors import CORS  
from sqlalchemy import func
from dotenv import load_dotenv
import os
app = Flask(__name__)
CORS(app) 

load_dotenv()

db_user = os.environ['DB_USER']
db_password = os.environ['DB_PASSWORD']
db_name = os.environ['DB_NAME']

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://{db_user}:{db_password}@127.0.0.1:3306/{db_name}".format(
    db_user=db_user, db_password=db_password, db_name=db_name
)

db = SQLAlchemy(app)

class User_data(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    fullName = db.Column(db.String(255), nullable=False)
    dob = db.Column(db.Date)
    email = db.Column(db.String(255), nullable=False)
    mobileNumber = db.Column(db.String(15))
    roles = db.Column(db.String(255))
    state = db.Column(db.String(255))
    city = db.Column(db.String(255))

@app.route('/get_users', methods=['GET'])
def get_users():
    users = User_data.query.all()
    
    users_array = [
        {
            'id': user.id,
            'fullName': user.fullName,
            'dob': user.dob.isoformat() if user.dob else None,
            'email': user.email,
            'mobileNumber': user.mobileNumber,
            'roles': user.roles,
            'state': user.state,
            'city': user.city
        }
        for user in users
    ]

    return jsonify(users_array)

@app.route('/add_user', methods=['POST'])
def add_user():
    try:
        data = request.json
        roles = ','.join([role.strip() for role in data.get('roles', '').split(',')])

        new_user = User_data(
            fullName=data['fullName'],
            dob=data['dob'],
            email=data['email'],
            mobileNumber=data['mobileNumber'],
            roles=roles,
            state=data['state'],
            city=data['city']
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'User added successfully'}), 201
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/delete_user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user_to_delete = User_data.query.get(user_id)
        if user_to_delete:
            db.session.delete(user_to_delete)
            db.session.commit()
            return jsonify({'message': 'User deleted successfully'}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/update_user/<user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        user_to_update = User_data.query.get(user_id)
        
        if user_to_update:
            data = request.json
            roles = ','.join([role.strip() for role in data.get('roles', [])])


            user_to_update.fullName = data['fullName']
            user_to_update.dob = data['dob']
            user_to_update.email = data['email']
            user_to_update.mobileNumber = data['mobileNumber']
            user_to_update.roles = roles
            user_to_update.state = data['state']
            user_to_update.city = data['city']

            db.session.commit()

            return jsonify({'message': 'User updated successfully'}), 200
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        print(str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)