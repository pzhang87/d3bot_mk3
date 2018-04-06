# #!/usr/bin/env bash
# if [ ! -z "$DEPLOYMENT_GROUP_NAME" ]; then
#  export NODE_ENV=$DEPLOYMENT_GROUP_NAME
# fi
#
pm2 startOrRestart /ec2-user/home/d3bot_mk3/config/ecosystem.json --env production
