package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"strings"
)

func LoadFile(file string) []string {
	data, err := os.Open(file)

	if err != nil {
		log.Fatal(err)
	}

	buff, err := ioutil.ReadAll(data)
	buff = buff[:len(buff)-2]

	return strings.Split(string(buff), "")
}

/*
Pop : is a nice function
*/
func Pop(poly []string) (string, []string) {
	return poly[len(poly)-1], poly[:len(poly)-1]
}

func IsReactive(a, b string) bool {
	if strings.ToLower(a) == strings.ToLower(b) {
		return a != b
	}

	return false
}

func LookForReactions(polymer []string) int {
	var candidate string
	var store []string

	for _, chr := range polymer {
		if candidate == "" {
			candidate = chr
			continue
		}

		if !IsReactive(candidate, chr) {
			store = append(store, candidate, chr)
		}

		if len(store) > 0 {
			candidate, store = Pop(store)
		}
	}

	store = append(store, candidate)
	return len(store)
}

func RemoveLetters(polymer []string, letter string) []string {
	var store []string
	for _, chr := range polymer {
		if letter != strings.ToLower(chr) {
			store = append(store, chr)
		}
	}

	return store
}

func Synth(polymer []string) int {
	cache := make(map[string]int)
	for _, chr := range polymer {
		var key = strings.ToLower(chr)
		if cache[key] == 0 {
			new_poly := RemoveLetters(polymer, key)
			cache[key] = LookForReactions(new_poly)
		}
	}

	smallest := 1000000

	for _, value := range cache {
		if smallest > value {
			smallest = value
		}
	}

	return smallest
}

func main() {
	code := LoadFile("./input-1.txt")
	finalPoly := LookForReactions(code)

	fmt.Println("first puzzle->", finalPoly)
	fmt.Println("Synth->", Synth(code))
}
