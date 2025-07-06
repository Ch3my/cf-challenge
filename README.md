# Crewfare Challenge

Backend code is in `crewfare-api` that is a NestJS backend

Frontend code is in `rooming-list-app` Vite, React, Tailwind app

For testing you can simply clone the repo and ejecute `docker-compose up` this will create the images and run the frontend on http://localhost:4173

If running somewhere else, you can adjust the env variables inside docker-compose.yml

When running inside docker, a postgres server is automatically started and DB is imported. You can re-import using the button in the frontend.

Note. I used snake_case for the column names because thats what internet recommends, in a real application i would verify company standards on column naming