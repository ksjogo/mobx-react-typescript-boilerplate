#!/usr/bin/env python3
import urllib.request


def action(player, action, parameter):
    arg = "http://localhost:3001/%d/%s/%d" % (player, action, parameter)
    print(arg)
    res = urllib.request.urlopen(arg)
    ret = int(res.read())
    print(ret)
    return ret


action(0, "east", 1)
