#!/usr/bin/env python

import zulip
import sys

# Keyword arguments 'email' and 'api_key' are not required if you are using ~/.zuliprc
client = zulip.Client(email="mydexter-bot@hack36.zulipchat.com",
                      api_key="gX6ulWhAzExkZcYSAtWgpsAMbrXLjcJn",
                      site="https://hack36.zulipchat.com")

# Send a private message
client.send_message({
    "type": "private",
    "to": "himanshushekharb16@gmail.com",
    "content": "I come not, friends, to steal away your hearts."
})

# Print each message the user receives
# This is a blocking call that will run forever
client.call_on_each_message(lambda msg: sys.stdout.write(str(msg) + "\n"))

# Print every event relevant to the user
# This is a blocking call that will run forever
# This will never be reached unless you comment out the previous line
client.call_on_each_event(lambda msg: sys.stdout.write(str(msg) + "\n"))
