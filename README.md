# REST-SERVER

Code the following routes using `node.js` `http` module

1. `/people?name='A'` (any occurance of character anywhere in the string)
2. `/people?age>85` (a greater than or less than comparison)
3. **Bonus** :beers: task  `/people?name='A'&/people?age>85` i.e support all of them in the same query
4. **Double Bonus** 🍻:beers: task give `200` and `400` `status` codes
   

:art: Please write proper variable names , Write a readable code so that others can read and understand 

// Edit Made by Branch Sailesh
objective 1,2 and 3 are completed in this program.

It will not work if a request ask for age, though it will work fine for exisiting properties like mass, height , hair_color etc;

now it can process multiple request (more than 2) in same query.

The result will be shown by the name of the Character.

For character matching, this program only works if the character to be searched is enclosed in single qoute not in double qoutes

Number of lines can be reduced by using functions, as much of the process for single request and multiple request (in same query) is same.
Results are shown in the browser.

Example query:- 
http://localhost:7000/people?name='a'&/people?height>40&/people?mass>100&/people?skin_color='f'

This will return only Wilhuff Tarkin , as only this character fulfils all the requests.
