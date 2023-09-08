"""empty message

Revision ID: 42dc513af456
Revises: d610f1c7a345
Create Date: 2023-09-08 13:28:39.236782

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '42dc513af456'
down_revision = 'd610f1c7a345'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pets', schema=None) as batch_op:
        batch_op.add_column(sa.Column('species_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_pets_species_id_species'), 'species', ['species_id'], ['id'])
        batch_op.drop_column('species')

    with op.batch_alter_table('species', schema=None) as batch_op:
        batch_op.add_column(sa.Column('emoji', sa.String(), nullable=False))
        batch_op.drop_column('photo')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('updated_at')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('updated_at', sa.DATETIME(), nullable=True))

    with op.batch_alter_table('species', schema=None) as batch_op:
        batch_op.add_column(sa.Column('photo', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('emoji')

    with op.batch_alter_table('pets', schema=None) as batch_op:
        batch_op.add_column(sa.Column('species', sa.VARCHAR(), nullable=False))
        batch_op.drop_constraint(batch_op.f('fk_pets_species_id_species'), type_='foreignkey')
        batch_op.drop_column('species_id')

    # ### end Alembic commands ###