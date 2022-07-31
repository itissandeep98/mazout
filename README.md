# POC for Electric Vehicle Charging station

## Tablet Views

![image](https://user-images.githubusercontent.com/44255731/182032369-8a381458-ffdd-40da-984a-8214f13ddb7e.png)
![image](https://user-images.githubusercontent.com/44255731/182032383-09fe782e-ea86-4e85-beb9-96e8c9950b13.png)
![image](https://user-images.githubusercontent.com/44255731/182032426-db828f99-cae9-41b9-9911-08fbe0ae77ff.png)
![image](https://user-images.githubusercontent.com/44255731/182032455-35d64fc0-8ca7-4f0c-961b-88310cb49bf5.png)
![image](https://user-images.githubusercontent.com/44255731/182032473-c2b962fe-13bf-42e3-a230-602176b07788.png)

## Phone/User Views

![image](https://user-images.githubusercontent.com/44255731/182032574-ceda861a-f71b-4929-b511-73a5b7a18db7.png)
![image](https://user-images.githubusercontent.com/44255731/182032605-34a8cdf4-031b-4858-b3de-f2eb58f2542f.png)

## Development

### Requirements

- Node.js >= 16.15.0
- yarn >= 1.22.18

### Environment variables

- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SUPABASE_URL

Both Needs to be set in .env file or the development environment and can be found after creating a database using [Supabase](https://supabase.com/)

### Local Development

- Install Node Modules
  ```
  yarn
  ```
- Run dev Server
  ```
  yarn dev
  ```

## Deployment

- Currently it is deployed using [Layer0/Edgio](https://www.layer0.co/)
  - Use `yarn layer0:deploy` to deploy to Layer0
- Since its a Next.js app you can use your own deployemnt accordingly
