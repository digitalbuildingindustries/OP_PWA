#!/bin/bash
npm run build
docker build --tag titanic.w11k:5000/oppwa:latest .
docker push titanic.w11k:5000/oppwa:latest 