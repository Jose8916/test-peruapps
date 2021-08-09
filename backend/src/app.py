from flask import Flask, json, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.users

@app.route('/')
def index():
    return 'Hola mundo'

@app.route('/users', methods=['POST'])
def createUser():
    id = db.insert({
        'fecha_nac': request.json['fecha_nac'],
        'num_celular': request.json['num_celular'],
        'sede': request.json['sede'],
        'nombre': request.json['nombre'],
        'apellido': request.json['apellido'],
        'password': request.json['password'],
        'correo': request.json['correo'],
    })
    return jsonify(str(ObjectId(id)))


@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'fecha_nac': doc['fecha_nac'],
            'num_celular': doc['num_celular'],
            'sede': doc['sede'],
            'nombre': doc['nombre'],
            'apellido': doc['apellido'],
            'password': doc['password'],
            'correo': doc['correo'],
        })

    return jsonify(users)

@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})
    print(user)
    return jsonify({
            '_id': str(ObjectId(user['_id'])),
            'fecha_nac': user['fecha_nac'],
            'num_celular': user['num_celular'],
            'sede': user['sede'],
            'nombre': user['nombre'],
            'apellido': user['apellido'],
            'password': user['password'],
            'correo': user['correo'],
    })

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': 'Usuario Eliminado'})

@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    db.update_one({'_id': ObjectId(id)}, {'$set':{
        'fecha_nac': request.json['fecha_nac'],
        'num_celular': request.json['num_celular'],
        'sede': request.json['sede'],
        'nombre': request.json['nombre'],
        'apellido': request.json['apellido'],
        'password': request.json['password'],
        'correo': request.json['correo'],
    }})
    return jsonify({'msg': 'Usuario Eliminado'})

if __name__ == "__main__":
    app.run(debug=True)