FROM nginx

MAINTAINER Julien DAUPHANT

COPY nginx/ /etc/nginx/
COPY www /var/www

CMD ["/bin/bash", "-c", "envsubst '$$PORT' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]