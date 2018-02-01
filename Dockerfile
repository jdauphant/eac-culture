FROM nginx

MAINTAINER Julien DAUPHANT

RUN mkdir -p /var/lib/nginx/cache
COPY nginx/ /etc/nginx/
COPY www /var/www

CMD ["/bin/bash", "-c", "envsubst '$$PORT $$AIRTABLE_KEY $$AIRTABLE_DB $$AIRTABLE_CACHE' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]