from random import randint, choice as rc
from faker import Faker
from app import db, app
from models import User, Owner, Pet, PetState, Adoption, Action, Species

faker = Faker()

def delete_records():
    with app.app_context():
        Owner.query.delete()
        Pet.query.delete()
        PetState.query.delete()
        Adoption.query.delete()
        Action.query.delete()
        Species.query.delete()
        db.session.commit()
        print("Records deleted")
        
def create_species():    
    species_dict = [
        {'name': 'rat', 'emoji': '🐀'},
        {'name':'mouse', 'emoji': '🐁'},
        {'name': 'cow', 'emoji': '🐄'},
        {'name': 'rabbit', 'emoji': '🐇'},
        {'name': 'cat', 'emoji': '🐈'},
        {'name': 'snake', 'emoji': '🐍'},
        {'name': 'horse', 'emoji': '🐎'},
        {'name': 'chicken', 'emoji': '🐓'},
        {'name': 'dog', 'emoji': '🐕'},
        {'name': 'pig', 'emoji': '🐖'},
        {'name': 'ant', 'emoji': '🐜'},
        {'name': 'fish', 'emoji': '🐟'},
        {'name': 'bird', 'emoji': '🐦'},
        {'name': 'duck', 'emoji': '🦆'}
    ]
    species = [Species(name=s['name'], emoji=s['emoji']) for s in species_dict]
    with app.app_context():
        db.session.add_all(species)
        db.session.commit()
        return species
# def create_users():
#     user_dict = [{ 'username': faker.user_name(), 'email': faker.email() } for _ in range(4)]
#     users = [User(username=u['username'], email=u['email'], password='12345678a') for u in user_dict]
#     with app.app_context():
#         db.session.add_all(users)
#         db.session.commit()
#         return users
def create_pets(species):
    pet_names = [faker.first_name() for _ in range(18)] + [
        'Sidon',    'Teba',     'Riju',     'Yunobo',
        'Mipha',    'Revali',   'Urbosa',   'Daruk',
        'Impa',     'Paya',     'Purah',    'Robbie',
        'Arthur',   'Fronk',    'Giselle',  'Mei',
        'Bolson',   'Cado',     'Fyson',    'Cottla',
        'Jerrin',   'Dorian',   'Koko',     'Mia',   
    ]
    
    with app.app_context():
        pets = []
        for _ in range(40):
            pet = Pet(name=rc(pet_names), species_id=rc(range(len(species))), state=PetState())
            pets.append(pet)
        db.session.add_all(pets)
        db.session.commit()
        return pets
     
def create_records(pets):
    with app.app_context():
        owners = []
        for i in range(2):
            owner = Owner(first_name=faker.first_name(), last_name=faker.last_name(), avatar=faker.ssn(), location=faker.city(), bio=faker.text(max_nb_chars=100), user_id=i+1)
            owners.append(owner)

        db.session.add_all(owners)
        db.session.commit()
        adoptions = [Adoption() for _ in range(12)]
        for a in adoptions:
            a.pet = rc(pets)
            a.owner = rc(owners)
        db.session.add_all(adoptions)
        db.session.commit()
        
        return owners, adoptions
    
    
if __name__ == '__main__':
    with app.app_context():
        print("seeding...")
        delete_records()
        species = create_species()
        pets = create_pets(species)
        owners, adoptions = create_records(pets)