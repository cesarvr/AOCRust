use std::fs;
use std::cmp;
use std::collections::HashMap;

fn solve1(input: &str) -> usize {
    let mut reacts = Vec::new(); 

    for n in input.chars() {

        if reacts.is_empty() {
            reacts.push(n);
            continue;
        }

        if let Some(bn) = reacts.pop() {
            if bn.eq_ignore_ascii_case(&n) && bn != n {
                continue;
            }else{
                reacts.push(bn);
                reacts.push(n);
            }
        }
    }

    reacts.len() - 1
}

fn solve2(input: &str) -> u32 {
    let mut repeated = HashMap::new();
    let mut minimal: u32 = std::u32::MAX;

    for c in input.chars() {
        if None != repeated.get(&c.to_ascii_lowercase()){
            continue;
        }

        let batch = input.chars().filter(|n| { 
            !c.eq_ignore_ascii_case(&n)
        });

        let solved = solve1(&batch.collect::<String>());
        minimal = cmp::min(minimal, solved as u32);

        repeated.insert(c.to_ascii_lowercase(), true);
    }

    minimal
}

fn main() {
    let input = fs::read_to_string("input.txt").expect("Unable to read file");
    //let input = "dabAcCaCBAcCcaDA";
    println!("size: {}", input.len());
    println!("solution 1: {}", solve1(&input));
    println!("solution 2: {}", solve2(&input));
   // solve2(&input);
}
