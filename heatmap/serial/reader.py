#!/usr/bin/env python3

import serial
import urllib.request
import sys


def action(player, action, parameter):
    arg = "http://localhost:3001/%d/%s/%d" % (player, action, parameter)
    # print(arg)
    res = urllib.request.urlopen(arg)
    ret = int(res.read())
    print(ret)
    return ret


if __name__ == "__main__":
    player = sys.argv[1]
    with serial.Serial(sys.argv[2], 9600, timeout=1) as ser:
        previous_data = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        threshold = 1024//2
        d = 0
        counter = 0
        for i in range(10):
            ser.readline()
        while(True):
            north_flag, south_flag, east_flag, west_flag, special_flag = False, False, False, False, False
            counter += 1
            try:
                current_data = ser.readline().decode("utf-8")
                current_data = current_data.split(",")[:-1]
                current_data = [float(x) for x in current_data]
                button, touch, mic, vib, coord_x, coord_y, coord_z, accel_x, accel_y, accel_z = current_data
            except ValueError:
                continue
            accel = (accel_x**2 + accel_y**2 + accel_z**2)
            # print(accel)
            if button > 0:
                print("North")
                north_flag = True
            if touch > 100:
                print("South")
                south_flag = True
            if mic > 950:
                print("West")
                west_flag = True
            if vib > 0:
                print("East")
                east_flag = True
            if accel > 2:
                print("Special")
                special_flag = True
            if counter % 100 == 0:
                if north_flag:
                    d = action(player, "north", 1)
                if south_flag:
                    d = action(player, "south", 1)
                if west_flag:
                    d = action(player, "west", 1)
                if east_flag:
                    d = action(player, "east", 3)
                if special_flag:
                    d = action(player, "special", 1)
            # print(f"Distance: {d}")
            ser.write(str(d).encode('utf-8'))
            ser.write('\n'.encode('utf-8'))
