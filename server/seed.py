from random import randint, choice as rc
from faker import Faker
from app import db, app
from models import Owner, Pet, Adoption

faker = Faker()

def delete_records():
    with app.app_context():
        Owner.query.delete()
        Pet.query.delete()
        Adoption.query.delete()
        db.session.commit()
        print("Records deleted")
def create_records():
    with app.app_context():
        owners = []
        for _ in range(10):
            owner = Owner(first_name=faker.first_name(), last_name=faker.last_name(), avatar=faker.ssn(), location=faker.city(), bio=faker.text(max_nb_chars=100))
            owners.append(owner)
        pets = []
        for _ in range(10):
            pet = Pet(name=faker.name(), species=faker.emoji())
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