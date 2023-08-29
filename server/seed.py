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
def create_records():
    with app.app_context():
        owners = []
        for i in range(2):
            owner = Owner(first_name=faker.first_name(), last_name=faker.last_name(), avatar=faker.ssn(), location=faker.city(), bio=faker.text(max_nb_chars=100), user_id=i+1)
            owners.append(owner)
        pets = []
        for _ in range(40):
            pet = Pet(name=faker.name(), species=faker.emoji(), state=PetState())
            pets.append(pet)
        db.session.add_all(owners + pets)
        db.session.commit()
        adoptions = [Adoption() for _ in range(12)]
        for a in adoptions:
            a.pet = rc(pets)
            a.owner = rc(owners)
        db.session.add_all(adoptions)
        db.session.commit()
        
        return owners, pets, adoptions
    
    
if __name__ == '__main__':
    with app.app_context():
        print("seeding...")
        delete_records()
        owners, pets, adoptions = create_records()