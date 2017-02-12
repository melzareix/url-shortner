# URL Shortener Microservice
```
User stories:
1) User Story: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
2) User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
3) User Story: When I visit that shortened URL, it will redirect me to my original link.
```


### Example usage:

```
https://url-shortnerz.herokuapp.com/api/v1/shorten/https://google.com
https://url-shortnerz.herokuapp.com/api/v1/shorten/http://codeforces.com/
https://url-shortnerz.herokuapp.com/api/v1/shorten/http://codeforces.com:80/
```

### Example output:

```
{
  "status": "OK",
  "original_url": "https://google.com",
  "shortened_url": "https://url-shortnerz.herokuapp.com/1000"
}
```

# How to install
 - Install NodeJS and NPM
 
  [https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)
  
- Clone the project

  ```
  git clone https://github.com/melzareix/url-shortner.git url-shortner
  ```
- Install Dependencies

  ```
  cd url-shortner
  npm install
  ```
- Run the project

  ```
    npm start
  ```
