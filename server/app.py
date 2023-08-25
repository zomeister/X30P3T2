from flask import session, request, make_response, jsonify, abort
from flask_restful import Resource
from flask_login import login_user, logout_user, login_required, current_user
from config import db, app, api, login_manager
from models import User, Owner, Pet, Adoption, Action

@app.route('/')
def index():
    return '<h1>Welcome to the Xeo Pets!</h1>'

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter_by(id=int(user_id)).first()

# -------- SIGNUP -------- #
class Signup(Resource):
    def post(self):
        data = request.get_json()
        try:
            new_user = User(
                username=data['username'],
                email=data['email'],
            )
            new_user.password_hash = data['password']
            new_owner = Owner(
                first_name='zed',
                last_name='zed',
                avatar='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                location='New York, NY',
                bio='This is my bio',
            )
            new_user.owner = new_owner
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            return new_user.to_dict(), 201
        except:
            raise Exception('Error creating new user')
api.add_resource(Signup, '/signup')
# -------- LOGIN -------- #
class Login(Resource):
    def post(self):
        data = request.get_json()
        try:
            pass
        except:
            pass
api.add_resource(Login, '/login')
# -------- LOGOUT -------- #
class Logout(Resource):
    def post(self):
        try:
            pass
        except:
            pass
api.add_resource(Logout, '/logout')
# -------- AUTHENTICATION -------- #
class Authentication(Resource):
    def get(self):
        try:
            pass
        except:
            return {"error": "unauthorized user"}, 401
api.add_resource(Authentication, '/authentication')
# -------- <user> PROFILE -------- #
class Profile(Resource):
    # @login_required
    def get(self):
        try:
            pass
        except:
            return {"error": "error retrieving user profile"}, 500
# -------- POUND -------- #
class Pound(Resource):
    def get(self):
        try:
            pass
        except:
            pass
    def post(self):
        try:
            pass
        except:
            pass
api.add_resource(Pound, '/pound')
# -------- <user> PETS -------- #

# -------- Pet by ID -------- #
class PetById(Resource):
    def get(self, pet_id):
        try:
            pet = Pet.query.filter_by(id=pet_id).first()
            return pet.to_dict(), 200
        except:
            pass
    def patch(self, pet_id):
        try:
            pass
        except:
            pass
api.add_resource(PetById, '/pet/<int:pet_id>')
# -------- Adoption by ID -------- #
class AdoptionById(Resource):
    def get(self, adoption_id):
        try:
            adoption = Adoption.query.filter_by(id=adoption_id).first()
            return adoption.to_dict(), 200
        except:
            pass
    def patch(self, adoption_id):
        pass
    def delete(self, adoption_id):
        pass
api.add_resource(AdoptionById, '/adoption/<int:adoption_id')