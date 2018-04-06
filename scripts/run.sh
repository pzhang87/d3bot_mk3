# #!/usr/bin/env bash
# if [ ! -z "$DEPLOYMENT_GROUP_NAME" ]; then
#  export NODE_ENV=$DEPLOYMENT_GROUP_NAME
# fi
#
cd /
pm2 startOrRestart /home/ec2-user/d3bot_mk3/config/ecosystem.json --env production
