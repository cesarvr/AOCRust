use std::fs;

fn extract_nodes(lines : &Vec<&str>) {
    lines.
}

fn main() {
    let contents = fs::read_to_string("./test.txt")
        .expect("Something went wrong reading the file");

    let lines: Vec<&str> = contents.split("\n").collect();

    extract_nodes(&lines);
    
    println!("data => {}", contents);
}
