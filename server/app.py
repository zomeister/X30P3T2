from flask import session, request, make_response, jsonify, abort
from flask_restful import Resource
from flask_login import login_user, logout_user, login_required, current_user
from config import db, app, api, login_manager, Migrate
from models import User, Owner, Pet, Adoption, Action
import traceback

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
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            return new_user.to_dict(), 201
        
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred creating user", "message": str(e)}, 500
api.add_resource(Signup, '/signup')
# -------- LOGIN -------- #
class Login(Resource):
    def post(self):
        data = request.get_json()
        try:
            data = request.get_json()
            user = User.query.filter_by(username=data.get('username')).first()
            password = request.get_json()['password']
            
            if user.authenticate(password):
                login_user(user, remember=True)
                return user.to_dict(), 200
            if not user:
                return {"error": "invalid username or password"}, 401
            
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred loading user", "message": str(e)}, 500
api.add_resource(Login, '/login')
# -------- LOGOUT -------- #
class Logout(Resource):
    def post(self):
        try:
            logout_user()
            return {"message": "successfully logged out"}, 200
        except:
            return {"error": "error logging out"}, 500
api.add_resource(Logout, '/logout')
# -------- AUTHENTICATION -------- #
class AuthorizeSession(Resource):
    def get(self):
        try:
            if current_user.is_authenticated:
                user = current_user
            return user.to_dict(), 200
        except:
            return {"error": "unauthorized user"}, 401
api.add_resource(AuthorizeSession, '/authorize_session')
# -------- <user> PROFILE -------- #
class Profile(Resource):
    # @login_required
    def get(self):
        try:
            pass
        except:
            return {"error": "error retrieving user profile"}, 500
    def post(self):
        data = request.get_json()
        try:
            new_owner = Owner(
                first_name=data['first_name'],
                last_name=data['last_name'],
                avatar=data['avatar'],
                location=data['location'],
                bio=data['bio']
            )
            db.session.add(new_owner)
            db.session.commit()
            return new_owner.to_dict(), 201
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred creating profile", "message": str(e)}, 500
api.add_resource(Profile, '/profile') # This needs to be fixed
# -------- POUND (pets with no owner that are able to be adopted) -------- #
class Pound(Resource):
    def get(self):
        try:
            orphans = Adoption.query.filter(Adoption.pet_id == None).all()
            orphans_dict = [p.serialize() for p in orphans]
            return orphans_dict, 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred retrieving pets", "message": str(e)}, 500
        
    def post(self):
        try:
            pass
        except:
            pass
api.add_resource(Pound, '/pound')
# -------- <user/owner> PETS (pets of current owner/user) -------- ???? #
class AdoptedPets(Resource):
    def get(self, id):
        try:
            adopted_pets = Adoption.query.filter(Adoption.owner_id == id).all()
            adopted_pets_dict = [p.serialize() for p in adopted_pets]
            return adopted_pets_dict, 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred retrieving pets", "message": str(e)}, 500
        
    def post(self):
        data = request.get_json()
        try:
            new_adoption = Adoption(
                pet_id=data['pet_id'],
                owner_id=data['owner_id'],
            )
            db.session.add(new_adoption)
            db.session.commit()
            return new_adoption.to_dict(), 201
        except:
            return {"ERROR"}, 422       
api.add_resource(AdoptedPets, '/adopted_pets')

# --------------------------------------------------------- #
# -------- OWNERS "/owners", "/owners/:id" -------- #
class Owners(Resource):
    def get(self):
        try:
            owners = Owner.query.all()
            owners_dict = [o.to_dict() for o in owners]
            return owners_dict, 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred retrieving owners", "message": str(e)}, 500
    def post(self):
        data = request.get_json()
        try:
            new_owner = Owner(
                first_name=data['first_name'],
                last_name=data['last_name'],
                avatar=data['avatar'],
                location=data['location'],
                bio=data['bio']
            )
            db.session.add(new_owner)
            db.session.commit()
            return new_owner.to_dict(), 201
        except:
            return {"ERROR"}, 422
class OwnerById(Resource):
    def get(self, id):
        try:
            owner = Owner.query.filter_by(id=id).first()
            return owner.to_dict(), 200
        except:
            return {"error": "owner not found"}, 404
    def delete(self, id):
        try:
            owner = Owner.query.filter_by(id=id).first()
            db.session.delete(owner)
            db.session.commit()
            return {}, 204
        except:
            return {'errors': 'owner not found'}, 404
    def patch(self, id):
        data = request.get_json()
        try:
            owner = Owner.query.filter_by(id=id).first()
            for key in data:
                setattr(owner, key, data[key])
            db.session.commit()
            return owner.to_dict(), 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred retrieving pets", "message": str(e)}, 500
api.add_resource(Owners, '/owners')
api.add_resource(OwnerById, '/owners/<int:id>')
# -------- PET "/pets", "/pets/:id" -------- #
class Pets(Resource):
    def get(self):
        try:
            pets = Pet.query.all()
            pets_dict = [p.to_dict() for p in pets]
            return pets_dict, 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred retrieving pets", "message": str(e)}, 500
    def post(self):
        data = request.get_json()
        try:
            new_pet = Pet(
                name=data['name'],
                species=data['species']
            )
            db.session.add(new_pet)
            db.session.commit()
            return new_pet.to_dict(), 201
        except:
            return {"ERROR"}, 422
class PetById(Resource):
    def get(self, id):
        try:
            pet = Pet.query.filter_by(id=id).first()
            return pet.to_dict(), 200
        except:
            return {"error": "pet not found"}, 404
    def delete(self, id):
        try:
            pet = Pet.query.filter_by(id=id).first()
            db.session.delete(pet)
            db.session.commit()
            return '', 204
        except:
            return {'errors': 'pet not found'}, 404
    def patch(self, id):
        data = request.get_json()
        try:
            pet = Pet.query.filter_by(id=id).first()
            for key in data:
                setattr(pet, key, data[key])
            db.session.commit()
            return pet.to_dict(), 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred retrieving pets", "message": str(e)}, 500      
api.add_resource(Pets, '/pets')
api.add_resource(PetById, '/pets/<int:id>')
# -------- ADOPTIONS "/adoptions", "/adoptions/:id" -------- #
class Adoptions(Resource):
    def get(self):
        try:
            adoptions = Adoption.query.all()
            adoptions_dict = [a.to_dict() for a in adoptions]
            return adoptions_dict, 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred retrieving adoptions", "message": str(e)}, 500
    def post(self):
        data = request.get_json()
        try:
            owner_row = Owner.query.filter_by(username=data['owner_username']).first()
            owner_id = owner_row.id
            pet_row = Pet.query.filter_by(name=data['pet_name']).first()
            pet_id = pet_row.id
            new_adoption = Adoption(
                owner_id = owner_id,
                pet_id = pet_id
            )
            db.session.add(new_adoption)
            db.session.commit()
            return new_adoption.to_dict(), 201
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred creating adoption", "message": str(e)}, 500
class AdoptionById(Resource):
    def get(self, id):
        try:
            adoption = Adoption.query.filter_by(id=id).first()
            return adoption.to_dict(), 200
        except:
            return {"error": "adoption not found"}, 404
    def delete(self, id):
        try:
            adoption = Adoption.query.filter_by(id=id).first()
            db.session.delete(adoption)
            db.session.commit()
            return {}, 204
        except:
            return {'errors': 'adoption not found'}, 404
    def patch(self, id):
        data = request.get_json()
        try:
            adoption = Adoption.query.filter_by(id=id).first()
            for key in data:
                setattr(adoption, key, data[key])
            db.session.commit()
            return adoption.to_dict(), 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred retrieving adoptions", "message": str(e)}, 500
api.add_resource(Adoptions, '/adoptions')
api.add_resource(AdoptionById, '/adoptions/<int:id>')
# -------- ACTIONS "/actions", "/actions/:id" -------- #
class Actions(Resource):
    def get(self):
        try:
            actions = Action.query.all()
            actions_dict = [a.to_dict() for a in actions]
            return actions_dict, 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred retrieving actions", "message": str(e)}, 500
    def post(self):
        data = request.get_json()
        try:
            pass
        except:
            pass
class ActionById(Resource):
    def get(self, id):
        try:
            action = Action.query.filter_by(id=id).first()
            return action.to_dict(), 200
        except:
            return {"error": "action not found"}, 404
    def delete(self, id):
        try:
            action = Action.query.filter_by(id=id).first()
            db.session.delete(action)
            db.session.commit()
            return {}, 204
        except:
            return {'errors': 'action not found'}, 404
    def patch(self, id):
        data = request.get_json()
        try:
            action = Action.query.filter_by(id=id).first()
            for key in data:
                setattr(action, key, data[key])
            db.session.commit()
            return action.to_dict(), 200
        except Exception as e:
            traceback.print_exc()
            return {"error": "an error occurred retrieving actions", "message": str(e)}, 500
api.add_resource(Actions, '/actions')
api.add_resource(ActionById, '/actions/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)