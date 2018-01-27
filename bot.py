#!/usr/bin/env python

import zulip

# Keyword arguments 'email' and 'api_key' are not required if you are using ~/.zuliprc
client = zulip.Client(email="mydexter-bot@hack36.zulipchat.com",
                      api_key="gX6ulWhAzExkZcYSAtWgpsAMbrXLjcJn",
                      site="https://hack36.zulipchat.com")

# Send a private message
def send_message(message, email):
    client.send_message({
        "type": "private",
        "to": email,
        "content": message,
    })