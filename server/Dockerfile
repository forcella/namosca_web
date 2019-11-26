# select image
FROM maven:3.5-jdk-8

ARG db_url
ENV DB_URL=${db_url}

WORKDIR /app

COPY target/server.jar /app

# set the startup command to run your binary
CMD ["java", "-jar", "server.jar"]
