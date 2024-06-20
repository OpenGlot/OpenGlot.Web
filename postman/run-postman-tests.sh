#!/bin/bash

# Run Postman collection with Newman
newman run OpenGlotTest.postman_collection.json -e Docker-OpenGlot.postman_environment.json --insecure
