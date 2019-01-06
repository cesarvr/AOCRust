use std::fs;
use std::collections::HashMap;

fn count_words(my_str: &str) -> i32 {
    let mut counter: HashMap<char, i32> = HashMap::new();

    for chr in my_str.chars() {
        match counter.get_mut(&chr) {
            Some(size) => {
                *size+=1;
                &counter.insert(chr, *size);
            },
            None => { counter.insert(chr, 1); },
        }
    }

    let mut freq = Vec::new();
    for value in counter.values() {
        if !freq.contains(&value) {
            freq.push(value);
        }
    }

    let mut total = 0;
    for n in &freq {
        println!("r -> {}", n);
        total += *n;
    }

    return total;
}

fn main() {
    let content = fs::read_to_string("./test.txt").expect("file not found");
    let mut lines = content.split("\n").collect::<Vec<&str>>();
    let size = lines.len();
    lines.split_off(size - 1);

    for i in &lines {
        println!("l -> {} total -> {}", i, count_words(i) );
    }
}
