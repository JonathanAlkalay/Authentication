VERSION=0.01
IMAGE_NAME=employee_management_client

FULL_IMAGE_NAME=${IMAGE_NAME}:${VERSION}

docker build ../../ -f ../../client/Dockerfile -t ${FULL_IMAGE_NAME}