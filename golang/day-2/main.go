package main

import (
  "fmt"
  "bytes"
  "io/ioutil"
  "strings"
  "strconv"
)

type WordCount = (map[string]int)

func counter(word string) WordCount {
  split_word := strings.Split(word, "")
  wordCounter := make(WordCount)

  for _, letter := range split_word {
    if wordCounter[letter] == 0 {
      wordCounter[letter] = 1
    } else {
      wordCounter[letter] += 1
    }
  }

  return wordCounter
}

func stringify(word WordCount) string{
  var buffer bytes.Buffer

  for _, value := range word {
    buffer.WriteString(strconv.Itoa(value))
  }
  return strings.Replace(buffer.String(), "1", "", -1)
}

func checkMaps(wordMap []WordCount) int {
  book := make(WordCount)
  total := 1
  for _, values := range wordMap {
    for key, _ := range values {
      book[key] += 1
    }
  }
  for _, value := range book {
    total *= value
  }
  return total
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
  for i1 := 0; i1 <= len(words)-2; i1++ {
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

  cache := []WordCount{}
  for _, word := range list {
    countedWords := counter(word)
    checks := stringify(countedWords)
    cache = append(cache, counter(checks))
  }
  fmt.Println("cache->", checkMaps(cache))
  check_id(list)
}
