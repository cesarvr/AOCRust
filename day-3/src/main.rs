use std::fs;

trait Creator {
    fn create(line: &str) -> Self;
}

macro_rules! four {
    () => {1+3};
}

struct Claim {
    id: String,
    x: i32,
    y: i32,
    width: i32,
    height: i32,
}

struct Canvas { 
    tiles: [[i32; 20]; 20],
}

impl Canvas {
    fn new() -> Canvas{
        let mut tiles = [[0; 20]; 20];
        for y in 1..20 {
            for x in 1..20 { 
                tiles[y][x] = 0;
            }
        }
        Canvas{ tiles: tiles }
    }

    fn render(&self, claim: &Claim) {
        for y in claim.y..claim.y_distance() {
            for x in claim.x..claim.y_distance() { 
                let mut tile = &self.tiles[y as usize][x as usize];
                print!("?");
                let x = match tile {
                    0 => &(1 as i32), 
                    1 => &(2 as i32),
                    _ => &(0 as i32),

                };
                tile = x;

                    print!("{}", tile);
            }
        } 
    }

    fn debug(&self) {
        for y in 1..20 {
            for x in 1..20 { 
               match self.tiles[y][x] {
                0 => print!("."),
                1 => print!("#"),
                2 => print!("x"),
                _ => {}    
               }; 
            }
            println!("");
        }
    }
}


fn get_pair(line: String, mark: &str) -> (i32, i32) {
    let nums   = line.split(&mark)
                     .map(|ns| ns.to_string()
                                 .parse::<i32>().unwrap())
                     .collect::<Vec<i32>>();
    (nums[0], nums[1])
}

impl Claim {
    fn x_distance(&self) -> i32 {
        self.x + self.width
    } 
    fn y_distance(&self) -> i32 {
        self.y + self.height
    }
}

impl Creator for Claim {
    fn create(line: &str) -> Claim {
        let sline  = line.to_string()
                         .replace("@ ","");

        let tokens = sline.split(" ")
                          .collect::<Vec<&str>>();
        
        let id         = tokens[0].to_string();
        let cords      = get_pair(tokens[1].replace(":", ""), ",");
        let dimensions = get_pair(tokens[2].to_string(), "x");

        Claim { 
            id: id, 
            x: cords.0, 
            y: cords.1, 
            width: dimensions.0, 
            height: dimensions.1 
        }
    }
}

fn read_list<Object>(file_name: &str) -> Vec<Object> 
    where Object: Creator {
    let list = fs::read_to_string(file_name)
                    .expect("file not found");

    list.lines()
        .map(|line| Object::create(line) )
        .collect::<Vec<Object>>()
}

fn show(claim: &Claim){
 println!("Claim id {}: x:{} y:{} , w:{}, h:{}", claim.id, claim.x, claim.y, claim.width, claim.height );
}

fn main() {
    let claims = read_list::<Claim>("./test.txt");

    
    let canvas = Canvas::new();

    claims.iter().for_each(|claim| { 
        show(claim);
        canvas.render(claim);
    });
    
    canvas.debug();

    println!("enchantment ? {}", four!());
}
