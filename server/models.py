from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from config import db, bcrypt

class User(db.Model, SerializerMixin, UserMixin):
    __tablename__ = 'users'
    # columns
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    # foreign keys
    # relationships
    owner = db.relationship('Owner', back_populates='user')
    # serialization
    serialize_rules = ('-owner.user', )
    # password validation
    @hybrid_property
    def password_hash(self):
        return self._password_pash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
        
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    # validation
    
class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'
    # columns
    id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String, nullable=False, unique=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    avatar = db.Column(db.String)
    location = db.Column(db.String)
    bio = db.Column(db.String)
    # foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    # relationships
    user = db.relationship('User', back_populates='owner', uselist=False)
    adoptions = db.relationship('Adoption', back_populates='owner', cascade='all, delete-orphan')
    # serialization
    serialize_rules = ('-adoptions.owner', '-adoptions.actions', '-adoptions.owner_id', '-user.owner',)
    # validation
    
class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'
    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    species = db.Column(db.String, nullable=False)
    # relationships
    adoptions = db.relationship('Adoption', back_populates='pet', cascade='all, delete-orphan')
    state = db.relationship('PetState', back_populates='pet', uselist=False)
    # serialization
    serialize_rules = ('-adoptions.pet', '-adoptions.owner', '-adoptions.actions', '-adoptions.pet_id',)
    # validation

class PetState(db.Model, SerializerMixin):
    __tablename__ = 'pet_states'
    # columns
    id = db.Column(db.Integer, primary_key=True)
    happiness = db.Column(db.Integer, nullable=False, default=100)
    health = db.Column(db.Integer, nullable=False, default=100)
    hunger = db.Column(db.Integer, nullable=False, default=100)
    
    # foreign keys
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))
    # relationships
    pet = db.relationship('Pet', back_populates='state')
    # serialization
    serialize_rules = ('-pet.state', '-pet.adoptions',)

  
class Adoption(db.Model, SerializerMixin):
    __tablename__ = 'adoptions'
    # columns
    id = db.Column(db.Integer, primary_key=True)
    # foreign keys
    owner_id = db.Column(db.Integer, db.ForeignKey('owners.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))
    # relationships
    owner = db.relationship('Owner', back_populates='adoptions')
    pet = db.relationship('Pet', back_populates='adoptions')
    actions = db.relationship('Action', back_populates='adoption')
    # serialization
    serialize_rules = ('-owner.adoptions', '-pet.adoptions', '-owner.bio', '-owner.user', '-owner.location', )
    # validation
    
class Action(db.Model, SerializerMixin):
    __tablename__ = 'actions'
    # columns
    id = db.Column(db.Integer, primary_key=True)
    # foreign keys
    adoption_id = db.Column(db.Integer, db.ForeignKey('adoptions.id'))
    # relationships
    adoption = db.relationship('Adoption', back_populates='actions')
    # serialization
    serialize_rules = ('-adoption.actions',)
    # validation
    
class Species(db.Model, SerializerMixin):
    __tablename__ ='species'
    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    photo = db.Column(db.String, nullable=False)