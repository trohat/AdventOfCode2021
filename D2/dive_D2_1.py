data_movement = open("dive_data").read().splitlines()
commands=[]
for line in data_movement:
    commands.append(tuple(line.split()))
print(commands)
horizontal_position=0
depth=0
for m, v in commands:
    if m=="forward":
        horizontal_position += int(v)
    elif m=="down":
        depth += int(v)
    elif m=="up":
        depth -= int(v)
print(horizontal_position, depth)
