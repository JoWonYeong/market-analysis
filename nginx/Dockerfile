# FROM node:16 as builder

# WORKDIR /usr/src/app

# COPY ./front/package*.json ./
# RUN npm install

# COPY ./front .

# RUN npm run build

FROM nginx

RUN rm -f /etc/nginx/conf.d/default.conf

# COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./sites-available/back.conf /etc/nginx/sites-available/
# COPY ./sites-available/front.conf /etc/nginx/sites-available/
# COPY ./react/ /usr/share/nginx/html/react/

RUN mkdir -p /etc/nginx/sites-enabled/\
    && ln -f -s /etc/nginx/sites-available/back.conf /etc/nginx/sites-enabled/

# RUN mkdir -p /etc/nginx/sites-enabled/\
#     && ln -s /etc/nginx/sites-available/front.conf /etc/nginx/sites-enabled/

# WORKDIR /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]
# CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]