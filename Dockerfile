FROM nginx

MAINTAINER Julien DAUPHANT

COPY nginx/ /etc/nginx/
COPY www /var/www

EXPOSE 8080