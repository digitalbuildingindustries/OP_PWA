# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.13
COPY dist/ usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf