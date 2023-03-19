<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">Stereopay Media Management</h3>
</div>
<!-- ABOUT THE PROJECT -->
## About The Project

This is a set of api that basically helps manage media, by storing, updating, deleting and getting the data

Key points:

- Create Media by passing in the media data, description, title and status
- Update the media data by passing in the id and status to be updated
- Delete the media data by just passing the id
- Find one, find many or search for media data by passing the query parameter, id or pagination parameters

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- NESTJS
- MYSQL
- PRISMA ORM
- TYPESCRIPT

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Guide to setting up and using the api

### Prerequisites

Make sure you have node installed on your machine

### Installation

1. Get a free API Key at [Cloudinary](https://cloudinary.com/) for the media upload

2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   yarn install
   ```
4. Enter your env variables in `.env` file
   ```js
   PORT=
   DATABASE_URL=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   ```
5. Run your migrationg
   ```sh
     npx prisma migrate dev --name init
   ```
6. Start your server
   ```sh
     yarn start:dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

We are assuming your port is running on port 4000;

1 . To craete media file, make a POST request to

```js
   http://localhost:4000/api/media

   request: {
     media: sample.mp3,
     status: 'ACTIVE',
     title: 'First Media',
     description: 'This is awesome'
   }

  response: {
   status: "success",
   message: "Media created successfully",
   data: {
       id: 1,
       type: "AUDIO",
       title: "First Media,
       description: "This is awesome",
       url: "https://res.cloudinary.com/dqe4xzwoe/video/upload/v1679240193/xgo7i1r1gsanqizgxtan.mp3",
       mediaPublicId: "xgo7i1r1gsanqizgxtan",
       status: "ACTIVE",
       createdAt: "2023-03-19T15:36:33.942Z",
       updatedAt: "2023-03-19T15:36:33.942Z",
       deletedAt: "2023-03-19T15:36:33.942Z"
   }
}
```

2. To find paginated media, send a GET request to

```js
   http://localhost:4000/api/media?page=1&perPage=2

   response: {
    status: "success",
    message: "Media data retrieved successfully",
    data: [
        {
            id: 54,
            type: "AUDIO",
            title: "test",
            description: "test description",
            url: "https://res.cloudinary.com/dqe4xzwoe/video/upload/v1679240193/xgo7i1r1gsanqizgxtan.mp3",
            mediaPublicId: "xgo7i1r1gsanqizgxtan",
            status: "ACTIVE",
            createdAt: "2023-03-19T15:36:33.942Z",
            updatedAt: "2023-03-19T15:36:33.942Z",
            deletedAt: "2023-03-19T15:36:33.942Z"
        }
    ]
   }
```

3. To get a single media data, send a GET request to

```js
   http://localhost:4000/api/media/1

   NOTE: the 1 at the end indicating the media id

   response: {
    status: "success",
    message: "Media data retrieved successfully",
    data: {
        id: 54,
        type: "AUDIO",
        title: "test",
        description: "test description",
        url: "https://res.cloudinary.com/dqe4xzwoe/video/upload/v1679240193/xgo7i1r1gsanqizgxtan.mp3",
        mediaPublicId: "xgo7i1r1gsanqizgxtan",
        status: "ACTIVE",
        createdAt: "2023-03-19T15:36:33.942Z",
        updatedAt: "2023-03-19T15:36:33.942Z",
        deletedAt: "2023-03-19T15:36:33.942Z"
    }
}
```

4. To search for media data, send a GET request to

```js
  http://localhost:4000/api/media/search?query=xyz

  NOTE: the "xyz" at the end indicating query param

  response: {
    status: "success",
    message: "Media data retrieved successfully",
    data: [
        {
            id: 54,
            type: "AUDIO",
            title: "test",
            description: "test description",
            url: "https://res.cloudinary.com/dqe4xzwoe/video/upload/v1679240193/xgo7i1r1gsanqizgxtan.mp3",
            mediaPublicId: "xgo7i1r1gsanqizgxtan",
            status: "ACTIVE",
            createdAt: "2023-03-19T15:36:33.942Z",
            updatedAt: "2023-03-19T15:36:33.942Z",
            deletedAt: "2023-03-19T15:36:33.942Z"
        }
    ]
}
```

5. To update the status of a media data send a PATCH request to

```js
  http://localhost:4000/api/media/1

  NOTE: the "1" at the end indicating media unique id

  request: {
    status: "INACTIVE"
  }

  response: {
    status: "success",
    message: "Media updated successfully",
    data: {
        id: 1,
        type: "AUDIO",
        title: "test",
        description: "test description",
        url: "https://res.cloudinary.com/dqe4xzwoe/video/upload/v1679240193/xgo7i1r1gsanqizgxtan.mp3",
        "mediaPublicId": "xgo7i1r1gsanqizgxtan",
        status: "ACTIVE",
        createdAt: "2023-03-19T15:36:33.942Z",
        updatedAt: "2023-03-19T15:36:33.942Z",
        deletedAt: "2023-03-19T15:36:33.942Z"
    }
}
```

6. To Delete medis data send a DELETE request to

```js
http://localhost:3000/api/media/1

NOTE: the "1" at the end indicating media unique id

respons:{
    status: "success",
    message: "Media deleted successfully",
    data: {
        id: 1,
        type: "AUDIO",
        title: "test",
        description: "test description",
        url: "https://res.cloudinary.com/dqe4xzwoe/video/upload/v1679240193/xgo7i1r1gsanqizgxtan.mp3",
        mediaPublicId: "xgo7i1r1gsanqizgxtan",
        status: "ACTIVE",
        createdAt: "2023-03-19T15:36:33.942Z",
        updatedAt: "2023-03-19T15:36:33.942Z",
        deletedAt: "2023-03-19T15:36:33.942Z"
    }
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
