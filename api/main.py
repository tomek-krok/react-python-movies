from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

import schemas
import models

app = FastAPI()
app.mount("/static", StaticFiles(directory="../ui/build/static", check_dir=False), name="static")


@app.get("/")
def serve_react_app():
    return FileResponse("../ui/build/index.html")


@app.get("/movies", response_model=List[schemas.Movie])
def get_movies():
    return list(models.Movie.select())


@app.post("/movies", response_model=schemas.Movie)
def add_movie(movie: schemas.Movie):
    movie = models.Movie.create(**movie.dict())
    actors = [
        {"name": "tomek", "surname": "frankowski"},
        {"name": "john", "surname": "doe"},
        {"name": "jane", "surname": "smith"}
    ]
    for actor in actors:
        actor_instance = models.Actor.create(**actor)
        models.ActorMovie.create(actor=actor_instance, movie=id(movie))
        # models.ActorMovie.create(actor=actor, movie=movie)
    return movie

@app.get("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int):
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return db_movie

@app.get("/actors", response_model=List[schemas.Actor])
def get_actors():
    return list(models.Actor.select())  

@app.post("/actors", response_model=schemas.Actor)
def add_actor(movie: schemas.ActorBase):
    if (movie.name is None) or (movie.surname is None):
        raise HTTPException(status_code=400, detail="Actor name and surname is required")
    else:
        movie = models.Actor.create(**movie.dict())
    return movie

@app.delete("/movies/{movie_id}", response_model=schemas.Movie)
def get_movie(movie_id: int):
    db_movie = models.Movie.filter(models.Movie.id == movie_id).first()
    if db_movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    db_movie.delete_instance()
    return db_movie
