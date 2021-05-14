<div align="center">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Lambda_lc.svg" height="150"/>
</div>
<h1 align="center">
    Pure && Lazy
</h1>
<div align="center">
    <img src="https://pyheroku-badge.herokuapp.com/?app=pure-and-lazy&style=flat"/>
</div>

# ePortfolio App

## Deployment process
### Introduction
The fellowing is telling you how to deply locally. If you think it is very hard, you can click this link https://comp90082-pure-and-lazy.herokuapp.com/ to see what we have done.

### Github repository link:
https://github.com/trundn/COMP90082-Assignment

### Config the environment variables
#### For the windows platform and MaxOS platform
Nodejs download website: https://nodejs.org/en/download/

### Version check command:
node -V

### Install MongoDB Application
#### Download MongoDB Community
install link: https://www.mongodb.com/try/download/community

#### Connect to MongoDB
Connection link: 
mongodb+srv://trungnd:Pass4eportfolio@cluster0.xjxw5.mongodb.net/pureandlazydb?retryWrites=true&w=majority


## Install Instructions
### Clone the project to local
Enter the command into the terminal:
git clone https://github.com/trundn/COMP90082-Assignment.git

### Switch to project directory:
cd COMP90082-Assignment

### Install dependencies:
npm install

### Setting up the environmental file
Create local file name as .env to set up MongoDB connect file.
copy variable into .env file:     MONGODB_PASSWORD = 'Pass4eportfolio'

### Launch the project:
npm start

### Launch the website
Open the browser and enter the URL localhost:4200


## Testing Instructions
1. Ensure you have run `npm install` before
2. Run `npm test`
3. Run `npm run e2e`

## Demo
https://drive.google.com/file/d/1muXfbl7JZaUouurrAPMktooaD5MlqpaV/view?usp=sharing

## Changelog session
1. ID-1: As a user, I want to create my resume on ePorfolio system, so that I can highlight my skills, experience, and achievements.
2. ID-2: As a user, I want to create an academic page, so that I can highlight my qualifications, scholarly works, honours, and awards.
3. ID-3: As a user, I want to create an event page, so that I can manage all events.
4. ID-4: As a user, I want to create a fun fact page, so that I can put all my hobbies.
5. ID-10: As a user, I want to add the ‘Connect with me’ section to the About Me page, so that I can add my social networking addresses.
6. ID-11: As a user, I want to add more personal information when creating an account so that I can express more about myself.
7. ID-12: As a user, I want to add an edit feature to the ManagePublicInformation Page, so that I can edit my personal information.
