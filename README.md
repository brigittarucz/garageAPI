## Music Garage API 
The purpose of the project is generating an API following best practices with Postman endpoint testing.

### Technologies
  - Node v12.18.3

### Features
  - Admin Panel ( for basic CRUD )
  - Dashboard ( with visually represented entries )
  - API

### API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | api/ | Get all the records. |
| GET | api/id/:id | Get specific record by id. |
| GET | api/name/:artistName | 	Get specific record filtered by artist name / first characters of artist's name. |
| GET | api/subgenre/:subgenre/:sIssues | Get specific record(s) based on subgenre with a set number of issues to retrieve. |
| GET | api/date/:date | Get records filtered by date with "today", "YYYY-MM-DD" and "YYYY-M-D" as accepted formats. |
| GET | api/song/:songTitle | Get records for songs by using search queries that match song names or part of their names. |
| GET | api/lyrics/:boolean | Get records for songs from various artists based on them containing lyrics or not. |
| GET | api/vibe/:vibe | Get records for songs from various artists based on their vibe. |

### How do I get started?

First, clone the repository.

```
https://github.com/brigittarucz/garageAPI.git
```

Then run `npm install` to install all the dependencies. Lastly enter the command `npm start` and you are in.

