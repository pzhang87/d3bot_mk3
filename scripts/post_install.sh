# symlink config files
ln -sf ~/d3bot_config/ecosystem.json ~/d3bot_mk3/config/ecosystem.json
ln -sf ~/d3bot_config/sites.json ~/d3bot_mk3/config/sites.json

!/usr/bin/env bash
set -e

# cd ~/ec2-user/home/d3bot_mk3
# npm install

# # setup NODE_ENV
# if [ ! -z "$DEPLOYMENT_GROUP_NAME" ]; then
#     export NODE_ENV=$DEPLOYMENT_GROUP_NAME
#
#     hasEnv=`grep "export NODE_ENV" ~/.bash_profile | cat`
#     if [ -z "$hasEnv" ]; then
#         echo "export NODE_ENV=$DEPLOYMENT_GROUP_NAME" >> ~/.bash_profile
#     else
#         sed -i "/export NODE_ENV=\b/c\export NODE_ENV=$DEPLOYMENT_GROUP_NAME" ~/.bash_profile
#     fi
# fi
#
# # add node to startup
# hasRc=`grep "su -l $USER" /etc/rc.d/rc.local | cat`
# if [ -z "$hasRc" ]; then
#     sudo sh -c "echo 'su -l $USER -c \"cd ~/node;sh ./run.sh\"' >> /etc/rc.d/rc.local"
# fi
