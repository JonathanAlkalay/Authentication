VERSION=0.02
IMAGE_NAME=employee_management_authentication

FULL_IMAGE_NAME=${IMAGE_NAME}:${VERSION}

docker build ../../ -f ../../authentication/Dockerfile -t ${FULL_IMAGE_NAME}