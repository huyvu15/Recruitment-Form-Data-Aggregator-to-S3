# Hiring-event-registration
node js project, collects data from form, upload the CV to amazon S3, store the form data in google sheet, app is deployed on amazon ec2


## URL
http://54.196.133.75:3001
>the app is running on the above link
>if the page doesn't connect make sure you are using http not https
or you can try:
http://ec2-54-196-133-75.compute-1.amazonaws.com:3001/

## s3 Bucket
nextleveltechhiringeventtask1

## google SpreadSheet
https://docs.google.com/spreadsheets/d/1WkB6I5LrSmZA9VjMHjcFD1romu5lUROEKtHEsF-5a3g/edit?usp=sharing


## to run source code
```
  npm install
  node index
```
> no need to run additional code for front end as i used ejs
>
> make sure to create folder './utils/CVs' if it doesn't exist
