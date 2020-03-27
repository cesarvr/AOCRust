from collections import deque, defaultdict

def play_game(max_players, last_marble):
    scores = defaultdict(int)
    circle = deque([0])

    for marble in range(1, last_marble + 1):
        if marble % 23 == 0:
            circle.rotate(7)
            scores[marble % max_players] += marble + circle.pop()
            circle.rotate(-1)
            print "???? " + str( list(circle) )
        else:
            circle.rotate(-1)
            circle.append(marble)

    	print "evolution" + str( list(circle) )
    return max(scores.values()) if scores else 0


play_game(9, 25)