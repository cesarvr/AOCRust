use std::fs;

fn read_list<'a>(file_name: &'a str) ->  Box<Vec<&str>>  {

    let list = fs::read_to_string(file_name).expect("fuck you");
    let tmp = list.split("/n");
    let o = tmp.collect::< Vec<&str> >();

    Box::new(o)
}

fn main() {
    let list = read_list("./test.txt");
    for i in *list {
        println!("{}", i);
    }
    println!("Hello, world!");
}
