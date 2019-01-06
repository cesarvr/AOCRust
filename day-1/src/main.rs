use std::fs;
use std::collections::HashMap;

type Dictionary<'a> = HashMap<&'a i32, &'a i32>;

struct Freq {
    numbers: Vec<i32>,
    total: i32,
}

fn sum(nums :&Vec<i32>, start: i32) -> Freq {
    let mut total = start;
    let mut numbers = Vec::new();

    for num in nums {
        total += num;
        numbers.push(total);
    }

    Freq { numbers, total }
}

fn find_frequency(v1: &Vec<i32>, map: &Dictionary ) -> bool {
    for x in v1 {
        if let Some(x) = map.get(x) {
            println!("And the number is {}", x);
            return true
        }
    }

    return false
}

fn make_map(v1: &Vec<i32>) -> Dictionary {
    let mut map = HashMap::new();
    for n in v1 {
        map.insert(n, n);
    }

    map
}

fn read_numbers_from_file(file: & 'static str) -> Vec<i32> {
    let content = fs::read_to_string(file).expect("file not found");

    return content.split("\n")
        .map(   |n| n.parse::<i32>() )
        .filter(|n| n.is_ok() )
        .map(   |n| n.unwrap() )
        .collect::<Vec<i32>>();
}

fn main() {
    println!("seeking...");

    let nums = read_numbers_from_file("./db.txt");

    let sample1 = sum(&nums, 0);
    let mut total = sample1.total;

    let map = make_map(&sample1.numbers);

    loop {
        let sample2 = sum(&nums, total);

        if find_frequency(&sample2.numbers, &map) {
            break;
        }

        total = sample2.total;
    }
}
