#/bim/bash
set -e

FIRST_DEPLOY='first_deploy'
LOCAL_HASH=$(docker images | grep $IMAGE_REPOSITORY$1 | tr -s ' ' | cut -d ' ' -f 3)[0]
echo "LOCAL_HASH_1 $LOCAL_HASH"
LOCAL_HASH=$(echo $LOCAL_HASH | cut -d ' ' -f 1)
echo "LOCAL_HASH_2 $LOCAL_HASH"
REMOTE_HASH=$(ssh -p $REMOTE_PORT $REMOTE_USERNAME@$REMOTE_HOST "docker images | grep $IMAGE_REPOSITORY$1 | tr -s ' ' | cut -d ' ' -f 3")
REMOTE_HASH=$(echo $REMOTE_HASH | cut -d ' ' -f 1)
REMOTE_HASH=${REMOTE_HASH:-$FIRST_DEPLOY}
echo "REMOTE_HASH_1 $REMOTE_HASH"

echo "LOCAL_IMG_HASH: $LOCAL_HASH"
echo "REMOTE_IMG_HASH: $REMOTE_HASH"

if [[ $LOCAL_HASH != $REMOTE_HASH ]]
then
  if [[ $REMOTE_HASH != $FIRST_DEPLOY ]]
  then
    echo "$1 Имедж изменился обновляем..."
    ssh -p $REMOTE_PORT $REMOTE_USERNAME@$REMOTE_HOST << XXX
      OLD_NAME=$IMAGE_REPOSITORY$1:$2
      NEW_NAME=$IMAGE_REPOSITORY$1:$2_previous
      echo "REMOTE IMG: \$OLD_NAME"
      echo "PREVIOUS IMG VERSION SAVED AS: \$NEW_NAME"
      docker image tag \$OLD_NAME \$NEW_NAME
XXX
  else
    echo "$1 Заливаем впервые..."
  fi
docker save $IMAGE_REPOSITORY$1:$2 | bzip2 | ssh -p $REMOTE_PORT $REMOTE_USERNAME@$REMOTE_HOST 'bunzip2 | docker load'

else
  echo "$1 имедж не изменился"
fi
