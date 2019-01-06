package main

import (
  "fmt"
  "io/ioutil"
  "strings"
  "strconv"
)

func make_group(wordCounter map[string]int) (map[int]int) {
  group := make(map[int]int)

  for _, value := range wordCounter {
    if(value > 1) {
      group[value] = value
    }
  }

  return group
}

func counter(split_word []string) (map[string]int) {
  wordCounter := make(map[string]int)

  for _, letter := range split_word {
    if wordCounter[letter] == 0 {
      wordCounter[letter] = 1
    }else {
      wordCounter[letter] += 1
    }
  }

  return wordCounter
}


func checksum(groups [](map[int]int), size int) int {
  numberCounter := []string{}
  for _, group := range groups {
    for K, _ := range group {
      numberCounter= append(numberCounter, strconv.Itoa(K))
    }
  }
  fmt.Println("wcnt ->", numberCounter)
  wcnt := counter(numberCounter)
  val := 1
  for _, value := range wcnt {
    val *= value
  }
  return val
}

func comp(word1, word2 string) string {
  word := []byte{}
  for i := 0; i <= len(word1)-1; i++ {
   if( word1[i] == word2[i]) {
    word = append(word, word1[i])
   }
  }

  return string(word)
}

func check_id(words []string){
  var full_box string
  for i1 := 0; i1 <= len(words)-1; i1++ {
    for i2 := i1+1; i2 <= len(words)-1; i2++ {
      word := comp(words[i1], words[i2])
      if(len(word) > len(full_box)) {
        full_box = word
      }
    }
  }

  fmt.Println("Full_box->", full_box)
}

func main() {
  data, err := ioutil.ReadFile("db.txt")
  if err != nil {
    fmt.Println("File reading error", err)
    return
  }

  list := strings.Split(string(data), "\n")
  list = list[:len(list)-1]
  groups := [](map[int]int){}
  letter_groups := [](map[string]int){}

  for _, word := range list {
    split_word := strings.Split(word, "")

    group := make_group( counter(split_word) )
    groups = append(groups, group)
    letter_groups = append(letter_groups, counter(split_word) )
  }

  fmt.Println("checksum: ", checksum(groups, len(list)) )
  check_id(list)
}
