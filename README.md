<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg" height="150"/>
</div>
<h1 align="center">
    Pure && Lazy
</h1>
<div align="center">
    <img src="https://pyheroku-badge.herokuapp.com/?app=pure-and-lazy&style=flat"/>
</div>

# ePortfolio App from Perfect World

## Introduction
This project is for COMP90082.
you can click this link https://comp90082-pure-and-lazy.herokuapp.com/ to see what we have done. The example account is provided in below.

  Account: ug_pw_example@mailinator.com

  Password: Example123321!

To further develop by yourself, you should use your own Auth0, MongoDB, cloudinary, travis and heroku.

### Prepare for the project
#### Github repository link:
https://github.com/trundn/COMP90082-Assignment

#### Config the environment variables
##### For the windows platform and MaxOS platform
Nodejs download website: https://nodejs.org/en/download/

#### Version check command:
node -V

#### Install MongoDB Application
##### Download MongoDB Compass
install link: https://www.mongodb.com/products/compass

##### Connect to MongoDB
Connection link: 
mongodb+srv://trungnd:Pass4eportfolio@cluster0.xjxw5.mongodb.net/pureandlazydb?retryWrites=true&w=majority

## Install Instructions
**Clone the project to local:**:
  git clone https://github.com/trundn/COMP90082-Assignment.git

**Switch to project directory you want:**
  cd COMP90082-Assignment

**Install dependencies:**
  npm install

**Setting up the environmental file:**
  Create local file name as .env in root to set up MongoDB connect file.
  copy variable into .env file:     MONGODB_PASSWORD = 'Pass4eportfolio'

**Launch the project:**
  npm start

**Launch the website:**
  Open the browser and enter the URL localhost:4200

## Testing Instructions
1. Ensure you have run `npm install` before
2. Run `npm test`
3. Run `npm run e2e`

## Demo
https://drive.google.com/file/d/1muXfbl7JZaUouurrAPMktooaD5MlqpaV/view?usp=sharing

## Changelog session
### Sprint 1
1. ID-1: As a user, I want to create my resume on ePorfolio system, so that I can highlight my skills, experience, and achievements.
2. ID-2: As a user, I want to create an academic page, so that I can highlight my qualifications, scholarly works, honours, and awards.
3. ID-3: As a user, I want to create an event page, so that I can manage all events.
4. ID-4: As a user, I want to create a fun fact page, so that I can put all my hobbies.
5. ID-10: As a user, I want to add the ‘Connect with me’ section to the About Me page, so that I can add my social networking addresses.
6. ID-11: As a user, I want to add more personal information when creating an account so that I can express more about myself.
7. ID-12: As a user, I want to add an edit feature to the ManagePublicInformation Page, so that I can edit my personal information.
### Sprint 2
1. ID-5: As a product owner, I want to refactor frontend source code, so that developers can easily maintain/enhance/develop features
2. ID-6: As a user, I want to upload qualifications and transcripts to the Resume page, so that I can provide additional information or evidence.
3. ID-7: As a user, I want to add a validation feature on Project and Blog page when users add/update portfolio items so that the application can prevent users from inputting invalid data. 
4. ID-8: As a product owner, I want to add CI/CD pipeline, so that developers can run unit tests automatically when merging features to the sprint branch; and merged features can be automatically deployed to the Heroku cloud platform
5. ID-9: As a user, I want to add a share feature to ePorfolio system, so that I can share my website on social networking such as Twitter, Facebook, Linkedin.
6. ID-14: As a user, I want to add print function in resume page so that I can print my resume into pdf
7. ID-15: As a product owner, I want to remove the Admin page, so that users can directly use visitor or editor mode to preview or modify portfolio.
8. ID-16: As a product owner, I want to modify all pages, so that they have the same style
