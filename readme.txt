General Information About Team Picker!
Forgot To add inline comment while adding things up

<***Team Picker***>
Before Start
createdb week4
knex migrate:latest
knex seed:run
localhost:4545/

[Method]
per Team = How Many People Will be in One Team
team Count = How Many Teams Will be

[Quantity]
will set the quantity of either method is chosen
e.g. per Team, 3 = 3 people per team
     team Count, 3 = members will divided into 3 Teams

     
<*** Navigation Bar Direction ***>
Team_picker && Home
=> Show all the cohorts(according to createdAt desc order)

Cohort
=> Search with cohort name(if exist open that cohort else error)

New Cohort
=> Make new Cohort(name, members) must be filled. If cohort name already exits error


<*** Edit, Delete ***>
If password is not given...
=> will edit all delete without further notice or verification

If password is given...
=> will ask for the password. If the password is correct it will do the edit or delete



