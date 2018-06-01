## Install MySQL container
pull the latest image by typing `docker pull mysql`  
run the container by issuing the following command  
`docker run --name interns-mysql -p 3306:3306 -v ${PWD}/mysql-database:/var/lib/mysql -e MYSQL_DATABASE=interns -e MYSQL_ROOT_PASSWORD=Passw0rd@123 -d mysql:5.7.22`  
