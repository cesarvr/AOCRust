use std::fs;
use std::collections::HashMap;

type Dict = HashMap<char, i32>;
fn debug_dict(dict: &Dict) {
    for key in dict.keys() {
        match dict.get(key) {
           Some(data) => println!("key {} -> {}", key, data),
           None => println!("{} empty!.", key)
       }
    }
}

fn count_words(iter: std::str::Chars) -> Dict {
    let mut map: Dict = HashMap::new();

    for chr in iter  {
        let value = map.entry(chr).or_insert(0);
        *value += 1;
    }
    map
}

fn compare_strings(word1: &String, word2: &String) -> String {
    let mut pbox = Vec::new();

    let mut w1 = word1.chars();
    let mut w2 = word2.chars();

    while let Some(letter1) = w1.next() {
       if letter1 == w2.next().unwrap() {
           pbox.push(letter1);
       }
    }

    let hello: String = pbox.into_iter().collect();
    return hello;
}

fn perfect_box_search(lines: &Vec<&str>) {

    let len = lines.len();
    let mut pbox = String::from("");

    for index1 in 0..(len-1) {
        for index2 in (index1 + 1)..len {
            let candidate = compare_strings( &lines[index1].to_string(), &lines[index2].to_string() );
            if( candidate.len() > pbox.len() ) {
                pbox = candidate;
            }
        }
    }

    println!("pbox ->{}", pbox);
}

fn stringify(wordMap: &Dict) -> String {
    let mut buffer = String::from("");

    for value in wordMap.values() {
        buffer.push_str( &value.to_string() );
    }
    buffer.replace("1", "")
}

fn main() {
    let content = fs::read_to_string("./db.txt").expect("file not found");
    let mut lines = content.split("\n").collect::<Vec<&str>>();
    let size = lines.len();
    lines.split_off(size - 1);

    let mut buffer = String::from("");
    let mut cache: Dict = HashMap::new();


    perfect_box_search(&lines);
    for i in &lines {
        buffer = stringify( &count_words( i.chars() ) );
        if buffer != "" {
            cache = count_words( buffer.chars() )
                                .keys()
                                .fold(cache, |mut acc, next| {
                {
                    let counter = acc.entry(*next).or_insert(0);
                    *counter += 1;
                }
                acc
            });
        }
    }

    println!("result: {}", cache.values().fold(1, |acc, next| acc * next ));
}
