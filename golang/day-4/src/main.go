package main

import (
  "fmt"
  "regexp"
  "strings"
  "strconv"
  "tools"
)

type Date struct {
    year  int
    month int
    day   int
}

type Time struct {
    hour  int
    minute int
}

type Registry struct {
  date Date
  time Time
}


func iarray(list []string) []int {
  ilist := []int{}
  for _, val := range list {
    ival, err := strconv.Atoi(val)

    if err != nil {
      panic("Not A Number: "+ val)
    }

    ilist = append( ilist, ival )
  }

  return ilist
}

func getDate(data string) Registry {
  re := regexp.MustCompile(`\[(.*)\]`)
  m  := re.FindAllStringSubmatch(string(data), -1)

  sdate := m[0][0]
  sdate = strings.Trim(sdate, "]")
  sdate = strings.Trim(sdate, "[")
  time_date := strings.Split(sdate  , " ")

  date := iarray( strings.Split( time_date[0], "-" ) )
  time := iarray( strings.Split( time_date[1], ":" ) )

  str_date := Date { year: date[0], month:  date[1], day: date[2] }
  str_time := Time { hour: time[0], minute: time[1] }

  registry := Registry { date: str_date, time: str_time }
  return registry
}

func newGuard(data string) {
  fmt.Println("data->", getDate(data))

}

func main() {
  list := t.load("test.txt")
  for _, item := range list {
    newGuard(item)
  }

}
