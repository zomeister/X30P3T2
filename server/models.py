from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt

class User(db.Model, SerializerMixin):
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
    owner = db.relationship('Owner', uselist=False, back_populates='user')
    # serialization
    serialize_rules = ()
    # validation
    
class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'
    # columns
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String)
    avatar = db.Column(db.String)
    location = db.Column(db.String)
    bio = db.Column(db.String)
    # foreign keys
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    # relationships
    user = db.relationship('User', back_populates='owner')
    adoptions = db.relationship('Adoption', back_populates='owner', cascade='all, delete-orphan')
    # serialization
    serialize_rules = ('-adoptions.owner', )
    # validation
    
class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'
    # columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    species = db.Column(db.String, nullable=False)
    # relationships
    adoptions = db.relationship('Adoption', back_populates='pet', cascade='all, delete-orphan')
    # serialization
    serialize_rules = ('-adoptions.pet',)
    # validation
    
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
    serialize_rules = ('-owner.adoptions', '-pet.adoptions',)
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
    