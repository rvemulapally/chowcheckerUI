### Deploying to Heroku
  * Install heroku-toolbelt - go to https://toolbelt.heroku.com, choose your platform and follow the steps
  * Go to your local chowchecker folder then add remote for heroku by this command
     > heroku git:remote -a chowaho (name of your heroku server)
  * Now you have another remote branch(heroku) aside from origin
  * To push code on the repository: **git push**
  * To deploy the code to heroku: **git push heroku**