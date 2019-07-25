use std::fs;
use std::collections::HashMap;

fn read_file(file: &str) -> Vec<String> {
    let list = fs::read_to_string(file)
        .expect("file not found");

    let tokens = list.split("");

    tokens.map(|s| s.to_string()).collect::<Vec<String>>()
}

fn equal_ignore_case(a: &str, b: &str) -> bool{
    a.eq_ignore_ascii_case(b)
}

fn react(token1: &String, token2: &String) -> bool {
    if equal_ignore_case(token1, token2) {
        return token1 != token2
    }

    false
}


fn process_v2(tokens: &mut Vec<String>) -> i32 {
    let mut end = tokens.len() - 1;

    while end  > 0 {
        let c1 = tokens.get(end).unwrap(); 
        let c2 = tokens.get(end - 1).unwrap(); 

        //println!("c1 {}, c2 {}  => end: {} len: {}", c1, c2, end, tokens.len());

        if react(&c1, &c2) {
            tokens.remove(end);
            tokens.remove(end - 1);

            //println!("next end-> {}", tokens.len());
            if end == (tokens.len()+1) {
            // print!("this is the back remove extra");
                end = end - 1;
            }
        }

        end = end - 1;
    }

    tokens.len() as i32
}

fn process(tokens: &mut Vec<String>) -> i32 {
    let mut polymer: Vec<String> = Vec::with_capacity(tokens.len());

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
            polymer.push(candidate);
            polymer.push(token);
        }
    }

    polymer.len() as i32
}

/* Puzzle part two
 *
 */
fn remove_unit(polymer: &Vec<String>, remove_chr: &str ) -> Vec<String> {
    let mut filtered_polymer: Vec<String> = polymer.to_vec();
    filtered_polymer.retain(|s| !equal_ignore_case(s, remove_chr) );
    filtered_polymer
}

fn main() {
    let mut code = read_file("./test.txt");
    let mut cache : HashMap<String, bool> = HashMap::new();

    println!("sample size {}", code.len());
    println!("--");

    code.retain(|s| !s.is_empty() && s.as_bytes()[0] != 10 );

    println!("solution 1: {}", process_v2(&mut code.to_vec()) );
    let minimum_reaction = code.iter().map(|chr| {
        if None == cache.get(&chr.to_lowercase()) {
            let mut moded = remove_unit(&code, chr);

            cache.insert(chr.to_lowercase(), true);
            return process_v2(&mut moded);
        }
        0x00beef
    })
    .filter(|&n| n != 0x00beef)
    .min()
    .unwrap();

    //let minimum_reaction = series.iter().filter(|&n| *n != 0x00beef).min().unwrap();
    println!("solution 2: {}", minimum_reaction);

}
