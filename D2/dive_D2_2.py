data_movement = open("dive_data").read().splitlines()
commands=[]
for line in data_movement:
    commands.append(tuple(line.split()))
horizontal_position=0
depth=0
aim=0
for m, v in commands:
    if m=="forward":
        if aim==0:
            horizontal_position += int(v)
        else:
            horizontal_position += int(v)
            depth += aim*int(v)
    elif m=="down":
        aim += int(v)
    elif m=="up":
        aim -= int(v)
print(horizontal_position, depth)