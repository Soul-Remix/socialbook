# Socialbook
 
Socialbook is a social media web app built using [React](https://reactjs.org), Written in [TS](https://www.typescriptlang.org/).

[Backend Repo](https://github.com/Soul-Remix/socialbook-api)    
[Live Page](https://social-book-app.netlify.app/home)

<details>
  <summary>🖼 Images</summary>
  <br>
  <p>Login Page</p>
  <img src="https://i.ibb.co/cQq7FT5/Capture1.png" alt="login page">
  <p>Main Page</p>
  <img src="https://i.ibb.co/M5VhyPR/Capture2.png" alt="main page">
  <p>Profile Page</p>
  <img src="https://i.ibb.co/myd9N9v/Capture3.png" alt="profile page">
  <p>Chat Page</p>
  <img src="https://i.ibb.co/4pz5XTH/Capture4.png" alt="chat page">
</details>

## Features

- Create Account, Update Account and delete Account
- Ability to add and remove friends
- A full fledged Live Private Chat
- Create posts, Update posts and delete posts
- Fully responsive Design
- Mobile first Design    

TODO: Live notification

## Run your own
```
git clone https://github.com/Soul-Remix/socialbook.git
cd socialbook
npm install
```

create .env file in the root directory and add the following:
```
REACT_APP_URI=<your backend API url>
```
create a folder called firebase in src and create firebase.ts and add your own credintals for your firebase storage    

finally:
```
npm run start
```

## Frameworks and tools

- [React](https://reactjs.org)
- [Material-UI](https://mui.com/)
- [React Query](https://react-query.tanstack.com/)
- [Zustnad](https://www.npmjs.com/package/zustand) For state management
- [Formik](https://www.npmjs.com/package/formik) and [Yup](https://www.npmjs.com/package/yup) For forms and validation
- [Socket-io](https://socket.io) For live chat
- [Firebase](https://firebase.google.com/) For image storage

## License
[MIT](https://choosealicense.com/licenses/mit/)
