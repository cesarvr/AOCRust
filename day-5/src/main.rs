use std::fs;
use std::collections::HashMap;

fn read_file(file: &str) -> Vec<String> {
    let list = fs::read_to_string(file)
        .expect("file not found");

    let tokens = list.split("");


    tokens.map(|s| s.to_string()).collect::<Vec<String>>()
}

fn react(token1: &String, token2: &String) -> bool {
    if token1.to_lowercase() == token2.to_lowercase() {
        return token1.to_string() != token2.to_string()
    }

    false
}

fn process(tokens: &mut Vec<String>) -> i32 {
    let mut polymer: Vec<String> = Vec::new();

    /*  for: aBBa
     *  1
     * token = 'a'
     * polymer ['a']
     * tokens ['a', 'B', 'B' ]
     *
     * 2
     * polymer ['a']
     * tokens ['a', 'B', 'B' ]
     * candidate = a
     * token = 'B'
     *
     * polymer = ['a', 'B']
     *
     */
    while let Some(token) = tokens.pop() {
        if polymer.is_empty() {
            polymer.push(token);
            continue;
        }

        let candidate = polymer.pop().unwrap();

        if !react(&candidate, &token) {
            polymer.push(candidate.to_string());
            polymer.push(token.to_string());
        }
    }

    polymer.len() as i32
}

/* Puzzle part two
 *
 */
fn remove_unit(polymer: &Vec<String>, remove_chr: &str ) -> Vec<String> {
    let mut npoly: Vec<String> = polymer.to_vec();
    npoly.retain(|s| *s != remove_chr.to_lowercase() && *s != remove_chr.to_uppercase() );
    npoly
}

fn main() {
    let mut code = read_file("./input2.txt");
    let mut cache : HashMap<String, bool> = HashMap::new();

    println!("sample size {}", code.len());
    println!("--");

    code.retain(|s| !s.is_empty() && s.as_bytes()[0] != 10 );

    println!("solution 1: {}", process(&mut code.to_vec()) );

    let series = code.iter().map(|chr| {
        if None == cache.get(&chr.to_lowercase()) {
            let mut moded = remove_unit(&code, chr.as_str());

            cache.insert(chr.to_lowercase(), true);
            return process(&mut moded);
        }
        0x00beef
    }).collect::<Vec<i32>>();

    let minimum_reaction = series.iter().filter(|&n| *n != 0x00beef).min().unwrap();
    println!("solution 2: {}", minimum_reaction);
}
