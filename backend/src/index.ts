import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from 'cors';

const app: Application = express();

const API_KEY = process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const RATE_LIMIT_INTERVAL = 1
const CACHE_INVALIDATION_TIME = 10

const port: number = 3002;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

const requests:{[key:string]: number} = {}
app.use((req,res,next) => {
  const requestTime = Date.now() / 1000
  if(!requests[req.ip]){
    requests[req.ip] = requestTime;
    next();
    return;
  }

  const prevRequestTime = requests[req.ip];
  const diff = requestTime - prevRequestTime;
  requests[req.ip] = requestTime

  if(diff < RATE_LIMIT_INTERVAL) {
    res.sendStatus(429)
    return
  }

  next();
})

interface CacheEntry {
  time: number,
  entry: any[]
}

const searchCache: {[key:string]: CacheEntry} = {}

app.get("/search", async (req: Request, res: Response): Promise<void> => {
  const search = req.query.search;
  const requestTime = Date.now() / 1000
  if(!search || typeof(search) !== 'string') {
    res.send(400)
    return;
  }

  if(searchCache[search]){
    const age = requestTime - searchCache[search].time
    if(age > CACHE_INVALIDATION_TIME){
      searchCache[search] = null
    } else {
      res.send(searchCache[search].entry)
      return
    }
  }

  const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjMxNzRlMDM5MjgxMTQxYWU3NzliMTdkOWZjOTRhNSIsInN1YiI6IjY0ZDc2MzVjMDAxYmJkMDEwMDVjMzY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4C17mSJOjN1mIAQKbed9-YJp1fOl7-WYwukqatQrA3M",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  searchCache[search] = {
    time : requestTime,
    entry: data
  }

  res.send(data);
});

app.get("/trending", async (req: Request, res: Response) => {
  const url =
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjMxNzRlMDM5MjgxMTQxYWU3NzliMTdkOWZjOTRhNSIsInN1YiI6IjY0ZDc2MzVjMDAxYmJkMDEwMDVjMzY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4C17mSJOjN1mIAQKbed9-YJp1fOl7-WYwukqatQrA3M",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data.results);

  res.send(data);
});

app.get("/details", async (req: Request, res: Response) => {
  const id = req.query.id;
  console.log(id);
  const url = "https://api.themoviedb.org/3/movie/" + id + "?language=en-US";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjMxNzRlMDM5MjgxMTQxYWU3NzliMTdkOWZjOTRhNSIsInN1YiI6IjY0ZDc2MzVjMDAxYmJkMDEwMDVjMzY4MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4C17mSJOjN1mIAQKbed9-YJp1fOl7-WYwukqatQrA3M",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data.results);

  res.send(data);
});

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
