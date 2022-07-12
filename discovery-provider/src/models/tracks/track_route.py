from sqlalchemy import Boolean, Column, Integer, PrimaryKeyConstraint, String
from src.models.base import Base
from src.models.model_utils import RepresentableMixin


class TrackRoute(Base, RepresentableMixin):
    __tablename__ = "track_routes"

    # Actual URL slug for the track, includes collision_id
    slug = Column(String, nullable=False)
    # Just the title piece of the slug for the track, excludes collision_id
    # Used for finding max collision_id needed for duplicate title_slugs
    title_slug = Column(String, nullable=False)
    collision_id = Column(Integer, nullable=False)
    owner_id = Column(Integer, nullable=False)
    track_id = Column(Integer, nullable=False)
    is_current = Column(Boolean, nullable=False)
    blockhash = Column(String, nullable=False)
    blocknumber = Column(Integer, nullable=False)
    txhash = Column(String, nullable=False)

    PrimaryKeyConstraint(owner_id, slug)
