docker run -d --name mongo01 --rm -p 27017:27017 -v /d/Source_Code/JS/eventy/mongo/eventydb:/data/db -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo