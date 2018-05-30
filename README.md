# REST-SERVER

Code the following routes using `node.js` `http` module

1. `/people?name='A'` (any occurance of character anywhere in the string)
2. `/people?age>85` (a greater than or less than comparison)
3. **Bonus** :beers: task  `/people?name='A'&/people?age>85` i.e support all of them in the same query
4. **Double Bonus** 🍻:beers: task give `200` and `400` `status` codes
   

:art: Please write proper variable names , Write a readable code so that others can read and understand 

// Edit Made by Branch Sailesh

Example query:- 
http://localhost:7000/people?name='a'&height={"gt":"40"}&mass={"gt":100}

This will return only "Jabba Desilijic Tiure" and "Chewbacca" , as only this character fulfils all the requests.
