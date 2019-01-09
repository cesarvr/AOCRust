package main

import (
  "fmt"
  "io/ioutil"
  "strings"
  "strconv"
)

type Fabric struct {
    bmp [][]byte
    mark byte
    overlap byte
}

type Claim struct {
  id string
  x int
  y int
  width int
  height int
  dirty bool
}

func (claim Claim) XDistance() int {
  return claim.x + claim.width
}

func (claim Claim) YDistance() int {
  return claim.y + claim.height
}

func (claim Claim) XOverlap(patch Claim) int {
  overlap := 0

  if claim.x <= patch.x && patch.x <= claim.XDistance() {
    overlap = claim.XDistance() - patch.x
  }

  x2 := patch.XDistance()
  if claim.x <= x2 && x2 <= claim.XDistance() {
    overlap += x2 - claim.x
  }

  if claim.x >= patch.x && claim.XDistance() <= x2 {
    return claim.width
  }

  if claim.x <= patch.x && claim.XDistance() >= x2 {
    return patch.width
  }
  return overlap
}

func (claim Claim) YOverlap(patch Claim) int {
  overlap := 0

  if claim.y <= patch.y && patch.y <= claim.YDistance() {

    overlap = claim.YDistance() - patch.y
  }

  y2 := patch.YDistance()
  if claim.y <= y2 && y2 <= claim.YDistance() {

    overlap += y2 - claim.y
  }

  if claim.y >= patch.y && claim.YDistance() <= y2 {
    return claim.height
  }

  if claim.y <= patch.y && claim.YDistance() >= y2 {
    return patch.height
  }

  return overlap
}

func (claim Claim) CheckOverlap(candidate Claim) int {
  if claim.id == candidate.id {
    return 0
  }

  return claim.XOverlap(candidate) * claim.YOverlap(candidate)
}



func parse(str string) Claim {
  str = strings.Replace(str, ":", "", -1)
  id := strings.Trim( strings.Split(str, " ")[0], " ")
  tokens := strings.Split(str, " ")
  coord  := strings.Split(tokens[2], ",")
  dim    := strings.Split(tokens[3], "x")

  x, _ := strconv.Atoi(coord[0])
  y, _ := strconv.Atoi(coord[1])
  w, _ := strconv.Atoi(dim[0])
  h, _ := strconv.Atoi(dim[1])

  claim := Claim{id: id, x: x, y: y, width: w, height: h, dirty: false }

  return claim
}

func load(name string) []string {
  data, err := ioutil.ReadFile(name)

  if err != nil {
    panic("File reading error")
  }

  list := strings.Split(string(data), "\n")
  list = list[:len(list)-1]

  return list
}


func (fabric Fabric) Render(claim Claim) Claim {
  ylimit := claim.y + claim.height
  xlimit := claim.x + claim.width

  if ylimit > 1000 {
    ylimit = 1000
  }

  if xlimit > 1000 {
    xlimit = 1000
  }

  for y := claim.y; y < ylimit; y++ {
    for x := claim.x; x < xlimit; x++ {

      if fabric.bmp[y][x] == fabric.overlap {
        continue
      }

      if fabric.bmp[y][x] == fabric.mark {
        fabric.bmp[y][x] = fabric.overlap
      } else {
        fabric.bmp[y][x] = fabric.mark
      }
    }
  }

  return claim
}

func (fabric Fabric) Overlaps() int {
  overlap_total := 0

  for _, row := range fabric.bmp {
      for _, inch := range row {
        if inch == fabric.overlap {
          overlap_total += 1
        }
      }
    }

  return overlap_total
}

func (fabric Fabric) Debug() {
  for _, row := range fabric.bmp {
      buff := ""
      for _, inch := range row {
        if inch == fabric.overlap {
          buff += "X"
        }
        if inch == fabric.mark {
          buff += "#"
        }
        if inch == "."[0] {
          buff += "."
        }
      }

      fmt.Println(buff)
    }
}


func newFabric(ssize int) Fabric{
  bmp := make([][]byte, ssize)
    for x := 0; x < ssize; x++ {
      for y := 0; y < ssize; y++ {
        bmp[x] = append(bmp[x], "."[0])
      }
    }

    return Fabric{bmp: bmp , mark:"#"[0], overlap:"X"[0] }
}

func lookForDirty(claims []Claim) {
  for _, claim := range claims {
    if claim.dirty == false {
      fmt.Println("@clean: ", claim.id)
    }
  }
}

func updateDirtyClaim(claims []Claim, candidate *Claim) {
  for index, _ := range claims {
    val := candidate.CheckOverlap(claims[index])
    if val > 0 {
      candidate.dirty = true
      claims[index].dirty = true
    }
  }
}

func main() {
  list := load("db.txt")
  fabric := newFabric(1000)
  claims := []Claim{}

  for _, value := range list {
    claim := parse(value)
    claim = fabric.Render(claim)
    updateDirtyClaim(claims, &claim)
    claims = append(claims, claim)
  }

  fmt.Println("overlaps: ", fabric.Overlaps())

  lookForDirty(claims)
}
