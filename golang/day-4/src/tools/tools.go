package tools

import (
  "io/ioutil"
  "strings"
)

func load(name string) []string {
  data, err := ioutil.ReadFile(name)

  if err != nil {
    panic("File reading error")
  }

  list := strings.Split(string(data), "\n")
  list = list[:len(list)-1]

  return list
}


