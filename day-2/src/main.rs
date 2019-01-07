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

fn reduce(dict: &Dict) {
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
        if !map.contains_key(&chr) {
            map.insert(chr, 1);
        }else {
            if let Some(value) =  map.get_mut(&chr) {
                *value+=1;
            }
        }
    }


    return map;
}

fn stringify(wordMap: &Dict) -> String {
    let mut buffer = String::from("");

    for value in wordMap.values() {
        buffer.push_str( &value.to_string() );
    }

    return buffer.replace("1", "");
}

fn main() {
    let content = fs::read_to_string("./db.txt").expect("file not found");
    let mut lines = content.split("\n").collect::<Vec<&str>>();
    let size = lines.len();
    lines.split_off(size - 1);


    let mut buffer = String::from("");
    let mut cache: Dict = HashMap::new();
    for i in &lines {
        buffer = stringify( &count_words( i.chars() ) );
        if(buffer != "") {
            cache = count_words( buffer.chars() ).keys().fold(cache, |mut acc, next| {
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
